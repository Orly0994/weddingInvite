const express = require('express')
const router = express.Router()
const Record = require('../models/Record')
const { v4: uuidv4 } = require('uuid')

router.get('/', async (req, res) => {
  res.json(await Record.find())
});

router.post('/', async (req, res) => {
  const payload = {
    ...req.body,
    uuid: uuidv4(),
    hasAnswered: false,
    timeAnswered: '',
  }

  const record = new Record(payload)
  await record.save()
  
  res.json({ state: 'success' })
})

router.get('/:uuid', async (req, res) => {
  res.json(await Record.findOne({ uuid: req.params.uuid }))
})

router.put('/:uuid', async (req, res) => {
  await Record.findOneAndUpdate({
    uuid: req.params.uuid
  }, req.body)

  res.json({state: 'updated'})
})

router.delete('/:id', async (req, res) => {
  await Record.findByIdAndRemove(req.params.id)

  res.json({state: 'deleted'})
})

module.exports = router