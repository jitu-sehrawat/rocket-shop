var assert = require('assert');
var ReviewProcess = require('../processes/review');
var MembershipApplciation = require('../models/membership_application');

describe('The Review Process', function () {

  describe('Receiving a valid application', function () {
    before(function (done) {
      validApp = new MembershipApplciation({
        first: 'Test',
        last: 'User',
        email: 'test@tgest.com',
        age: 30,
        height: 65,
        weight: 180
      });

      var review = new ReviewProcess();
      review.processApplication(validApp, function (err, result) {
        decision = result;
        done();
      });
    });

    it('return success', function () {
      assert(decision.success, decision.message);
    });

  });

})