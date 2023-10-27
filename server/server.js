import  express  from "express";
const app = express();

import cors from 'cors'
import connectDB from "./db/db.js";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authRouter from './routes/authRoutes.js'
import tasksRouter from './routes/taskRoutes.js'
import authenticator from "./middleware/authenticator.js";

import dotenv from 'dotenv'
dotenv.config() 

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('GET request to the homepage')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/tasks',authenticator, tasksRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware) 

const port = process.env.PORT || 5000
const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, ()=>{
            console.log(`App is listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()