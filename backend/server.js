const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connectDB = require('./config/db')


require('dotenv').config()

//routes
const blogRoutes = require('./routes/blog')
const authRoutes = require('./routes/auth')

const app = express()

//database
connectDB()

//middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

//cors
if(process.env.NODE_ENV === 'development'){
    app.use(cors({origin: `${process.env.CLIENT_URL}`}))
}
//routes
app.use('/api',blogRoutes)
app.use('/api',authRoutes)

//routes
app.get('/api',(req, res) => {
    res.json({time: Date().toString()})
})

//port
const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log(`Server is running on port: ${PORT}`)
})