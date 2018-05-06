'use strict'

const ServiceGoogle = require('../service/Google')

class Profiles {
  constructor (config) {
    this.config = config;
    this.serviceGoogle = new ServiceGoogle(config)
    this.get = this.get.bind(this)
    //  this.handleGoogleServiceResponse = this.handleGoogleServiceResponse(this);
  }

  handleGoogleServiceResponse (res, err, profiles) {
    res.json(profiles)
  }

  get (req, res) {
    this.serviceGoogle.getSpreadSheet(this.handleGoogleServiceResponse.bind(this, res));
  }

  toString () {
    return 'my profiles are ';
  }

}

module.exports = Profiles

