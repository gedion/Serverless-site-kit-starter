'use strict'
const GoogleSpreadsheet = require('google-spreadsheet')
const async = require('async')
const _ = require('lodash')
const {auth} = require('google-auth-library');
class Google {
  constructor (config) {
    this.config = config;
    let sheetId = _.get(this.config, 'sheet_family_profiles');
    this.spreadsheet = new GoogleSpreadsheet(sheetId); // Sheet ID (visible in URL)i }
    this.getInfoAndWorksheets = this.getInfoAndWorksheets.bind(this)
    this.authenticate = this.authenticate.bind(this);
  }

  authenticate (done) {
    console.log('auth ', this.config.googleAuth);
    let googleAuth = require(__dirname + this.config.googleAuth);
    this.spreadsheet.useServiceAccountAuth(googleAuth, done)
  }

  getInfoAndWorksheets (done) {
    this.spreadsheet.getInfo(function(err, info) {
      if (err) {
        console.error(err);
        return done(err);
      }
      const sheet = info.worksheets[0];
        const rowOptions = {
          limit  : 100000,
          offset : 0
        }

        return sheet.getRows(rowOptions, (rowsError, rows) => {
          if (rowsError) {
            console.error(rowsError);
            return done(rowsError);
          }
          return done(null, rows);
        });
    });
 }

 getSpreadSheet (callback) {
   let self = this;
    async.waterfall([
      this.authenticate,
      this.getInfoAndWorksheets,
    ], (err, rows) => {
        if( err ) {
          console.log('Error: '+err);
        }
        rows = _.chain(rows)
          .map(_.partialRight(_.pick, Google.PROFILE_COL_KEYS))
          .values()
        callback(null, rows)
    })

  };
}

Google.PROFILE_COL_KEYS = ["id", "text", "firstname", "lastname", "nickname", "birthdate", "birthplace", "job", "biography", "father", "mother"];

module.exports = Google
