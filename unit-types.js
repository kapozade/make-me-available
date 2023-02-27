const Constants = require('./constants');

module.exports = class UnitTypes {

  static HOUR = new UnitTypes('HOUR', Constants.HourToMilliseconds);
  static H = new UnitTypes('H', Constants.HourToMilliseconds);
  static MINUTE = new UnitTypes('MINUTE', Constants.MinuteToMilliseconds);
  static M = new UnitTypes('M', Constants.MinuteToMilliseconds);

  constructor(name, value){
    this.name = name;
    this.value = value;
  }
}
