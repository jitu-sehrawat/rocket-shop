var _ = require('underscore')._;
var momnet = require('moment');

var MembershipApplication = function (args) {
  args|| (args = {})
  _.extend(this,args);

  this.validUntil = args.validUntil ? momnet(args.validUntil) : momnet().add(10, "days");

  this.expired = function() {
    return this.validUntil.isBefore(momnet());
  }

  this.emailIsValid = function () {
    return this.email && this.email.length > 3 && this.email.indexOf("@") > -1;
  };
  this.heightIsValid = function () {
    return this.height && this.height > 60 && this.height < 75;
  };
  this.ageIsValid = function () {
    return this.age && this.age > 15 && this.age < 100;
  };
  this.weightIsValid = function () {
    return this.weight && this.weight > 100 && this.weight < 300;
  };
  this.nameIsValid = function () {
    return this.first && this.last;
  };
  this.validationMessage = function() { console.log('hee')
    if(this.IsValid()) { console.log('1')
      return 'Application is valid';
    } else if(!this.emailIsValid){console.log('2')
      return 'Email is invalid';
    } else if(!this.heightIsValid){console.log('3')
      return 'Height outside our limit of 60 and 75 inches';
    } else if(!this.ageIsValid){console.log('4')
      return 'Age is outside our limit of 15 abd 100 years';
    } else if(!this.nameIsValid){console.log('5')
      return 'A first an dlast name is required';
    } else if(!this.weightIsValid){console.log('6')
      return 'Weight is outside our limit of 100 and 300 pounds';
    } else if(!this.expired){console.log('7')
      return 'This application is expired';
    }
  }
  this.IsValid = function () {
    return this.emailIsValid() &&
          this.heightIsValid() &&
          this.ageIsValid() &&
          this.nameIsValid() &&
          this.weightIsValid() &&
          !this.expired();
  };
};

module.exports = MembershipApplication;