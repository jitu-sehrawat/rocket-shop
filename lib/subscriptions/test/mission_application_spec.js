var assert = require('assert');
var MembershipApplication = require('../models/membership_application.js')

describe('Membership Application requirments', function() {
  var validApp;

  before(function() {
    validApp = new MembershipApplication({
      first: 'Test',
      last: 'User',
      email: 'test@test.com',
      age: 30,
      height: 66,
      weight: 180
    });
  })
  describe('Application validate if...', function() {
    it('all validators successful', function(){
      assert(validApp.IsValid(), "Not Valid");
    });
    it("is not expired", function() {
      var app = new MembershipApplication({validUntil : Date.parse("01/01/2010")});
      assert(app.expired());
    });
    it('email is 4 more chars and contains an @', function() {
      assert(validApp.emailIsValid());
    });
    it('height is between 60 and 75 inches', function() {
      assert(validApp.heightIsValid());
    });
    it('age is between 15 and 100', function() {
      assert(validApp.ageIsValid());
    });
    it('weight is between 100 and 300', function() {
      assert(validApp.weightIsValid());
    });
    it('first and last name are provided', function() {
      assert(validApp.nameIsValid());
    });
  })
})