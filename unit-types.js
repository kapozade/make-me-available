const Constants = require('./constants');

module.exports = class UnitTypes {

  static Hour = new UnitTypes('H', Constants.HourToMiliseconds);
  static H = new UnitTypes('H', Constants.HourToMiliseconds);
  static Minute = new UnitTypes('M', Constants.MinuteToMiliseconds);
  static M = new UnitTypes('M', Constants.MinuteToMiliseconds);

  constructor(name, value){
    this.name = name;
    this.value = value;
  }

  toValue() {
    return this.value;
  }
}
