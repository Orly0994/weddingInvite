const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const initRecords = require('./createRecords')

const app = express()

app.set('port', 80)

app.use('/', express.static(path.join(__dirname, '/public/')))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/records', require('./api/Records'))

initRecords()

app.listen(app.get('port'), () => {
  console.log(`server working on ${app.get('port')}`)
})
