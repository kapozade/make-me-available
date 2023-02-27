const Constants = require('./constants');

module.exports = class UnitTypes {

  static Hour = new UnitTypes('H', Constants.HourToMilliseconds);
  static H = new UnitTypes('H', Constants.HourToMilliseconds);
  static Minute = new UnitTypes('M', Constants.MinuteToMilliseconds);
  static M = new UnitTypes('M', Constants.MinuteToMilliseconds);

  constructor(name, value){
    this.name = name;
    this.value = value;
  }
}
