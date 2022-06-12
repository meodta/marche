const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
const port = 4000
const jsonData = require('./public/stateData.json')

app.get('/data', (req, res) => {
    res.json(jsonData)
})

app.listen(port, () => {
    console.log(`Backend's running on port ${port}`)
})
