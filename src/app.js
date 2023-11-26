import express from 'express'
import cors from 'cors'
import UserRoute from "./routes/auth.route.js"
import PersonRoute from "./routes/person.route.js"
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json());

app.use('/api/auth', UserRoute);

app.use('/api/person', PersonRoute);


export { app };







