const express = require('express')
const app = express()
const port = process.env.PORT || 80

var counter = 0

const count = () => {
    counter++
}

setInterval(count, 1000)

app.get('/', (req, res) => res.send(`Hello World!, ${counter}`))



app.listen(port, () => console.log(`Example app listening on port ${port}!`))


