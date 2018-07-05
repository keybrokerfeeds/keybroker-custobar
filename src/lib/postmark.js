'use strict';

const Postmark = require('postmark');
const { POSTMARK_API_KEY } = require('../../config/credentials')

const client = new Postmark.Client(process.env.POSTMARK_API_KEY || POSTMARK_API_KEY);

module.exports.sendEmail = (to, cc, subject, body, attachment) => {
  const options = {
    From: process.env.POSTMARK_SENDER || "tools@marvillewomen.com",
    To: process.env.POSTMARK_RECEIVER || to,
    Cc: cc,
    Subject: subject,
    TextBody: body,
    Attachments: attachment
  };

  return new Promise((resolve, reject) => {
    client.sendEmail(options, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports.sendHTMLEmail = (to, cc, subject, body, attachment) => {
  const options = {
    From: process.env.POSTMARK_SENDER || "tools@marvillewomen.com",
    To: process.env.POSTMARK_RECEIVER || to,
    Cc: cc,
    Subject: subject,
    HTMLBody: body,
    Attachments: attachment
  };

  return new Promise((resolve, reject) => {
    client.sendEmail(options, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports.sendEmailWithTemplate = (to, cc, templateID, templateModel, attachment) => {

  const options = {
    "From": process.env.POSTMARK_SENDER || "tools@marvillewomen.com",
    "To": process.env.POSTMARK_RECEIVER || to,
    "Cc": cc,
    "TemplateId": templateID,
    "TemplateModel": templateModel,
    "Attachments": attachment
  };

  return new Promise((resolve, reject) => {
    client.sendEmailWithTemplate(options, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};