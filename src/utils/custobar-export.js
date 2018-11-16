let request = require('request-promise')
request = request.defaults({jar: true});
const Promise = require('bluebird')
const moment = require('moment')
const cheerio = require('cheerio')

function buildDateArray(startDate, endDate) {
	let dateArray = []
	let currentDate = moment(startDate);
	while (currentDate <= endDate) {
		dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
		currentDate = moment(currentDate).add(1, 'days');
	}	
	return dateArray
}

class custobarExport {
	constructor () {
		this._data = {}
		this._campaigns = {}
		this._cookiejar = request.jar();
	}

	populate (credentialsPath, startDate, endDate) {
		const { username, password, shop } = require(credentialsPath)
		 startDate = startDate ? startDate : moment().subtract(89, 'days') // '2018-07-01'
		 endDate = endDate ? endDate : moment() // Default to now

		const dateArray = buildDateArray(startDate, endDate)

		// Login and setup cookies
		return new Promise((resolve, reject) => {
			request.get({uri: `https://${shop}.custobar.com/login/`, jar: this._cookiejar, resolveWithFullResponse: false})
			.then((res) => {
				const $ = cheerio.load(res)
				return $('form input[name="csrfmiddlewaretoken"]').attr('value')
			})
			.then((token) => {
				const options = {
					uri: `https://${shop}.custobar.com/login/?next=`,
					method: 'POST',
					headers: {
						'content-type': 'application/x-www-form-urlencoded',
						'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
						'Referer': `https://${shop}.custobar.com/`,
					},
					form: {
						'username': username,
						'password': password,
						'csrfmiddlewaretoken': token	
					},
					resolveWithFullResponse: true,
					jar: this._cookiejar,
					simple: false
				}

				return request(options)	
			})
			.then((res) => {
				const options = {
					uri: `https://${shop}.custobar.com/ui-api/campaigns/actions-by-start-date/?from=${encodeURIComponent(moment(startDate).format())}&to=${encodeURIComponent(moment(endDate).format())}`,
					method: 'GET',
					jar: this._cookiejar,
					json: true
				}

				return request(options)
			})
			.then((res) => {
				for (var i = 0; i < res.payload.length; i++) {
					this._campaigns[moment(res.payload[i].date).format('YYYY-MM-DD')] = {'name': res.payload[i].name}
				}
				return
			})
			.then(() => {
				const map = [
				{
					uri: `https://${shop}.custobar.com/statistics/dashboard/?graph=activity&start=${encodeURIComponent(moment(startDate).format())}&end=${encodeURIComponent(moment(endDate).format())}`,
					method: 'GET',
					jar: this._cookiejar,
					json: true
				},
				{
					uri: `https://${shop}.custobar.com/statistics/dashboard/?graph=sales&start=${encodeURIComponent(moment(startDate).format())}&end=${encodeURIComponent(moment(endDate).format())}`,
					method: 'GET',
					jar: this._cookiejar,
					json: true
				},
				{
					uri: `https://${shop}.custobar.com/statistics/dashboard/?graph=customer&start=${encodeURIComponent(moment(startDate).format())}&end=${encodeURIComponent(moment(endDate).format())}`,
					method: 'GET',
					jar: this._cookiejar,
					json: true
				}
				]

				return Promise.map(map, (option) => {
					return request(option)
				})
			})
			.then((res) => {
				let table = []
				for (var i = 0; i < dateArray.length; i++) {
					let tmp = {
						date: dateArray[i],
						source: 'Custobar email',
						name: this._campaigns[dateArray[i]] ? this._campaigns[dateArray[i]].name : ''
					}

					// Let's get everything and use the labelKeys given by Custobar
					res.forEach((endpoint) => {
						endpoint.series.forEach((el) => {
							tmp[el.labelKey] = el.data[i]
						})
					})

					// Fix the revenue from "cents"
					tmp['revenue'] = tmp['revenue'] ? tmp['revenue'] / 100 : 0

					// To please Funnel.io
					tmp['cost'] = 0
					tmp['currency'] = 'SEK'
					
					table.push(tmp)
				}
				this._data = table
				resolve()
			})
			.catch((err) => {
				reject(err)
			})
		})
	}

	getData() {
		return this._data
	}  	
}

module.exports = new custobarExport()
