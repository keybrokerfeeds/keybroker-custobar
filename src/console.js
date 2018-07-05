const Promise = require('bluebird')

const custobarExport = require('./utils/custobar-export')
const { join } = require('path')
const credentials = join(__dirname, '../config/credentials.json')

class consoleExport {
	constructor() {}

	run() {
		return custobarExport.populate(credentials) 
		.then(() => {
			const table = custobarExport.getData()
			let lines = Object.keys(table[0]).join(';') + '\n'

			for (var i = 0; i < table.length; i++) {
				lines += Object.values(table[i]).join(';') + '\n'
			}

			console.log(lines)
			return true
		})
		.catch((err) => {
			console.error(err)
		})			
	}
}

module.exports = new consoleExport()