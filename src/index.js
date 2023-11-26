import dotenv from 'dotenv'
import connectDB from './db/index.js'
import { app } from './app.js'


dotenv.config({
    path: './env'
})

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server Started At Port ${process.env.PORT} `)
    })
}).catch((error) => {
    console.log('Error while connecting to the Server', error)
})