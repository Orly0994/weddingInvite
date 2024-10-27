let idCounter = 1

const Record = class {
  id = null
  name = ''
  drinks = [
    {
      id: 4,
      name: 'Коньяк',
      isChecked: true,
    },
    {
      id: 5,
      name: 'Виски',
      isChecked: true,
    },
  ]
  presence = null
  comment = 'Какой то коммент'

  constructor(name) {
    this.name = name
    this.id = idCounter
    idCounter++
  }

  setDrinks(drinks) {
    this.drinks = drinks
  }

  setPresence(presence) {
    this.presence = presence
  }
}

module.exports = Record