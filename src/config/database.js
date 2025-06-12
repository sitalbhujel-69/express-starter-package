import mongoose from "mongoose"
const connectToDatabase = async ()=>{
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log(`database connected successfully!`)
  } catch (error) {
    console.error('something went wrong while connecting to db',error)
  }
}

export {connectToDatabase}