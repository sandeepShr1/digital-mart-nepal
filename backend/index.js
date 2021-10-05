const connectToMongo = require('./db');
const express = require('express')
 

connectToMongo();
const app = express()
const port = 5000


app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/products', require('./routes/products'))


app.listen(port, () => {
    console.log(`DigitalMartNepal app listening at http://localhost:${port}`)
})