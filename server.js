import mongoose from 'mongoose'
import app from './app.js'
import config from './config/index.js'

(async () => {
    try {
        mongoose.connect(config.MONGODB_URI)
        console.log('DB connected')
        app.on('error', (error) => {
            console.log("ERROR: ", error);
            throw error;
        })
        const onListening = () => {
            console.log(`Listening on ${config.PORT}`)
        }
        app.listen(config.PORT, onListening)
    } catch (error) {
        console.log("ERROR ", error);
        throw error
    }
})()