const Constants = require('./constants');

class UnitTypes {
  static HOUR   = new UnitTypes('HOUR', Constants.HourToMilliseconds);
  static H      = new UnitTypes('H',    Constants.HourToMilliseconds);
  static MINUTE = new UnitTypes('MINUTE', Constants.MinuteToMilliseconds);
  static M      = new UnitTypes('M',    Constants.MinuteToMilliseconds);

  constructor(name, value) {
    this.name = name;
    this.value = value;
  }

  static isValid(unit) {
    return Object.getOwnPropertyNames(UnitTypes)
      .some(k => UnitTypes[k] instanceof UnitTypes && UnitTypes[k].name === unit);
  }

  static fromName(unit) {
    const key = Object.getOwnPropertyNames(UnitTypes)
      .find(k => UnitTypes[k] instanceof UnitTypes && UnitTypes[k].name === unit);
    return key ? UnitTypes[key] : null;
  }
}

module.exports = UnitTypes;