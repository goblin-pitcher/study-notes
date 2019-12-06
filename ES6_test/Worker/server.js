let express = require('express')
let app = new express()
app.use(express.static(__dirname))
app.listen(4000)