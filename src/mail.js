const Promise = require('bluebird')

const custobarExport = require('./utils/custobar-export')
const mail = require('./lib/postmark')
const moment = require('moment')

const { join } = require('path')
const credentials = join(__dirname, '../config/credentials.json')

class mailExport {
	constuctor() {}

	run() {
		return custobarExport.populate(credentials) 
		.then(() => {
			const table = custobarExport.getData()
			let lines = Object.keys(table[0]).join(';') + '\n'

			for (var i = 0; i < table.length; i++) {
				lines += Object.values(table[i]).join(';') + '\n'
			}
			return lines
		})
		.then((lines) => {
			const { shop } = require(credentials)
			const today = moment().format('YYYY-MM-DD')

			const to = process.env.CUSTOBAR_RECEIVER || 'fredrik.holmen@keybroker.com'
			const cc = process.env.CUSTOBAR_RECEIVER_CC || null
			const subject = today + ' Custobar export: ' + shop
			const body = `Data export from ${shop}'s Custobar account.

Date and time of export: ${moment().format()}
File format: CSV
Headers: date; source; name; open; click; browse; sale; unsubscribe; spamReport; revenue; discount; saleCount; newCustomers; totalCustomers; currency; cost
Delimiter: ;
New line: \/n

Lamba details
Stage: ${process.env.myStage}
Region: ${process.env.myRegion}
__________________________________________________________
This data export was generated by a script from Keybroker. 
Github repo: https://github.com/keybrokerfeeds/keybroker-custobar | Keybroker.se | sales@keybroker.com

`

			const attachment = [{
				"Name": `${today}_custobar_${shop}.csv`,
				"Content": Buffer.from(lines).toString('base64'),
				"ContentType": "text/plain"
			}]
			return mail.sendEmail(to, cc, subject, body, attachment)
		})
		.catch((err) => {
			console.error(err)
		})		
	}
}

module.exports = new mailExport()
