const sexes = ['he', 'she', 'they']

interface IDictionary {
  dear: string
  you: string[]
  support: string
  can: string
}

const wordsMap: Object = {
  he: {
    dear: 'Дорогой',
    you: ['Тебя', 'Тобой', 'Ты', 'Твое'],
    support: 'поддержишь',
    can: 'Сможешь',
  },
  she: {
    dear: 'Дорогая',
    you: ['Тебя', 'Тобой', 'Ты', 'Твое'],
    support: 'поддержишь',
    can: 'Сможешь',
  },
  they: {
    dear: 'Дорогие',
    you: ['Вас', 'Вами', 'Вы', 'Ваше'],
    support: 'поддержишь',
    can: 'Сможете',
  },
}

export const useWords = (gender: string = sexes[0]): IDictionary => {
  return wordsMap[gender]
}
