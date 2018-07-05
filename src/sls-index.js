'use strict'
/*
 * Copyright (C) 2018, Keybroker AB. All rights reserved.
 */

const Mail = require('./mail')
const Console = require('./console')

module.exports = {
	outputAsMail: (event, context, callback) => {
		Mail.run()
		.then(() => {
			callback(null, {success: true})
		})
		.catch((err) => {
			console.error(err)
			callback(err, {success: false})
		})
	},
	outputOnConsole: (event, context, callback) => {
		Console.run()
		.then(() => {
			callback(null, {success: true})
		})
		.catch((err) => {
			console.error(err)
			callback(err, {success: false})
		})
	}
}

module.exports.outputOnConsole({},{}, (err, result) => { console.log(err, result)} )