import { app } from "./src/app.js";
import { connectToDatabase } from "./src/config/database.js";

const port = process.env.PORT || 4040
connectToDatabase()
.then(()=>{
  app.listen(port,()=>console.log(`server started successfully at port: ${port}`))
})