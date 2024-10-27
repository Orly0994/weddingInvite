const Record = require('./Record')

const Records = class {
  records = []

  constructor() {}

  addRecord(name) {
    this.records.push(new Record(name))
  }

  setRecord(id, record) {
    const index = this.records.findIndex(rec => rec.id === id)

    if (index > -1) {
      this.records[index] = record
    }
  }

  deleteRecord(id) {
    const index = this.records.findIndex(rec => rec.id === id)

    if (index) {
      this.records.split(index, 1)

      return true
    }

    return false
  }

  findById(id) {
    return this.records.find(record => record.id === id)
  }
}

const records = new Records()

module.exports = records