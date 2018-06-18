var Emitter = require('events').EventEmitter;
var util = require('util');

var ReviewProcess = function (args) {

  var callback;

  // make sure the app is valid
  this.ensureAppValid = function(app) {
    if(app.IsValid()) {
      this.emit('validated', app);
    } else { 
      this.emit('invalid', app.validationMessage());
    }
  };

  // find next mission
  this.findNextMission = function(app) {
    // stub this out for now
    app.mission = {
      commander: null,
      pilot: null,
      MAVPilot: null,
      passengers: []
    };
    this.emit('mission-selected', app);
  };

  // make sure role selected is availabe
  this.roleIsAvailable = function(app) {
    // we have no concept of role selection just yet
    //TODO: what about a role? Need more info
    this.emit('role-available', app);
  };

  // make usre height/weight/age is right for role
  this.ensureRoleCompatible = function(app) {
    //TODO: find out about roel and height/weight etc
    this.emit('role-compatible', app);
  };

  // accept th the app with a message
  this.acceptApplication = function(app) {
    callback(null, {
      success: true,
      message: 'Welcome to Mars Program'
    })
  };
  
  // deny the app with a message
  this.denyApplication = function(message) {
    callback(null, {
      success: false,
      message: message
    })
  };

  this.processApplication = function(app, next) {
    callback = next;
    this.emit('application-received', app);
  }

  // event path
  this.on('application-received', this.ensureAppValid);
  this.on('validated', this.findNextMission);
  this.on('mission-selected', this.roleIsAvailable);
  this.on('role-available', this.ensureRoleCompatible);
  this.on('role-compatible', this.acceptApplication);

  this.on('invalid', this.denyApplication);
}

util.inherits(ReviewProcess, Emitter);
module.exports = ReviewProcess;