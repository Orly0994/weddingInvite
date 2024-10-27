const express = require('express')
const router = express.Router()

const records = require('../models/Records')

router.get('/', async (req, res) => {
   res.json(records.records)
});

router.post('/', async (req, res) => {
  records.addRecord(req.body)
  
  res.json({state: 'success'})
})

router.get('/:id', async (req, res) => {
  res.json(records.findById(Number(req.params.id)))
})

router.put('/:id', async (req, res) => {
  records.setRecord(Number(req.params.id), req.body)
  res.json({state: 'updated'})
})

router.delete('/:id', async (req, res) => {
  const response = records.deleteRecord(Number(req.params.id))

  if (response) {
    res.json({state: 'deleted'})
  } else {
    res.json({state: 'not deleted'})
  }
})

module.exports = router