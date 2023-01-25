const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

const PORT = process.env.PORT || 1222


// app levelmiddleware
app.use(morgan('common'))
app.use(cors('*'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//user defined routes
app.use('/send', require('./routes/chatbot'))

app.listen(PORT, (err)=>{
    if(err){
        console.log(err)
        return
    }
    console.log(`Server up on port - ${PORT}`)
})