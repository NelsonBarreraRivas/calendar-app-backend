import mongoose from "mongoose"

export const connectDB = async () => {
    try {

        await mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser : true,
            useUnifiedTopology: true
        })

        console.log('DB online');

    } catch (error) {
        console.log(error);
        process.exit()
    }
}