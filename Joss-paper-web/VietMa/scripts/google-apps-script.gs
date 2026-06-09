// Google Apps Script: Webhook to append POSTed JSON into Google Sheet
// 1) Replace SHEET_ID with your sheet ID (from the URL you provided)
// 2) Optionally set SECRET_KEY to a secret string and include ?key=SECRET when calling

const SHEET_ID = '1GB0EPbq6R2txaTkE2WjdlvAQaFpPo1DXEcs0D-JKkUs'; // <- your sheet id
const SECRET_KEY = '123123'; // optional: change to a secret or leave empty to disable

function parseRequestBody(e) {
  e = e || { parameter: {} }

  if (e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents)
    } catch (err) {
      const params = new URLSearchParams(e.postData.contents)
      return {
        source: params.get('source') || '',
        product: params.get('product') || '',
        name: params.get('name') || '',
        phone: params.get('phone') || '',
        occasion: params.get('occasion') || '',
        message: params.get('message') || '',
      }
    }
  }

  return {
    source: (e.parameter && e.parameter.source) || '',
    product: (e.parameter && e.parameter.product) || '',
    name: (e.parameter && e.parameter.name) || '',
    phone: (e.parameter && e.parameter.phone) || '',
    occasion: (e.parameter && e.parameter.occasion) || '',
    message: (e.parameter && e.parameter.message) || '',
  }
}

function doPost(e) {
  try {
    // simple key check
    if (SECRET_KEY && (!e.parameter || e.parameter.key !== SECRET_KEY)) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'invalid_key' }))
        .setMimeType(ContentService.MimeType.JSON)
    }

    const body = parseRequestBody(e)

    const ss = SpreadsheetApp.openById(SHEET_ID)
    const sheet = ss.getSheetByName('Sheet1') || ss.getSheets()[0]

    // Append row: timestamp, source, product, name, phone, occasion, message
    sheet.appendRow([
      new Date(),
      body.source || '',
      body.product || '',
      body.name || '',
      body.phone || '',
      body.occasion || '',
      body.message || '',
    ])

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON)
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

function doGet(e) {
  return doPost(e)
}
