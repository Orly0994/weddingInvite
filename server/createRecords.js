const Record = require('./models/Record')
const { v4: uuidv4 } = require('uuid')

const testGuests = [
  {
    name: 'Андрей',
    gender: 'he',
    drinks: [
      {
        id: 3,
      },
      {
        id: 4,
      },
    ],
    comment: 'Хочу еще пива нефильтрованного',
    presence: true,
  },
  {
    name: 'Настя',
    gender: 'she',
    drinks: [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ],
    comment: 'Ем людей в костюме котлеты',
    presence: true,
  },
  {
    name: 'Кто-то и кто-то',
    gender: 'they',
    drinks: [
      {
        id: 5,
      },
      {
        id: 7,
      },
    ],
    comment: '',
    presence: false,
  },
]


const initRecords = async () => {
  const records = await Record.find()
  
  if (records.length > 0) {
    return 
  }

  testGuests.forEach(async (guest) => {
    const payload = {
      ...guest,
      uuid: uuidv4(),
      hasAnswered: false,
      timeAnswered: '',
    }

    const record = new Record(payload)

    await record.save()
  })
}

module.exports = initRecords