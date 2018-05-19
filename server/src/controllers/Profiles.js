'use strict'

const ServiceGoogle = require('../service/Google')
const _ = require('lodash')

class Profiles {
  constructor (config) {
    this.config = config;
    this.serviceGoogle = new ServiceGoogle(config)
    this.get = this.get.bind(this)
    //  this.handleGoogleServiceResponse = this.handleGoogleServiceResponse(this);
  }

  handleGoogleServiceResponse (id, res, err, profiles) {
    if (id) {
      let profile = _.find(profiles, {id})
      console.log('profile ', profiles);
      res.json(profile)
    } else {
      res.json(profiles)
    }
  }

  get (req, res) {
    let id =  _.get(req, 'params.id')
    this.serviceGoogle.getSpreadSheet(this.handleGoogleServiceResponse.bind(this, id, res));
  }

  toString () {
    return 'my profiles are ';
  }

}

module.exports = Profiles

