'use strict'
/*
 * Copyright (C) 2018, Keybroker AB. All rights reserved.
 */

const Mail = require('./mail')
const Console = require('./console')
const Logger = require("modern-logger")

module.exports = {
	outputAsMail: (event, context, callback) => {
		Mail.run()
		.then(() => {
			Logger.info("[CUSTOBAR] Export OK", "Stage:", process.env.myStage, "Region:", process.env.myRegion)
			return callback(null, {success: true})
		})
		.catch((err) => {
			Logger.error("[CUSTOBAR] Error", "Stage:", process.env.myStage, "Region:", process.env.myRegion, err)
			return callback(err, {success: false})
		})
	},
	outputOnConsole: (event, context, callback) => {
		Console.run()
		.then(() => {
			callback(null, {success: true})
		})
		.catch((err) => {
			Logger.error(err)
			callback(err, {success: false})
		})
	}
}

// Uncomment to test
// module.exports.outputAsMail({}, {},function(err, result) {
// 	Logger.info(err,result)
// })