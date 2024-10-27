const records = require('./models/Records')

const initRecords = () => {
  records.addRecord('Андрей')
  records.addRecord('Настя')
  records.addRecord('Андрей1')
  records.addRecord('Андрей2')
  records.addRecord('Андрей3')
}

module.exports = initRecords