import express from "express"
import mongoose from "mongoose"
import listEndpoints from "express-list-endpoints"
import userRoutes from "./services/users/index.js" 

const server = express()
const PORT = process.env.PORT || 3001

server.use(express.json())
console.table(listEndpoints(server))
server.use("/user", userRoutes)

mongoose.connect(process.env.MONGO_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true  })

mongoose.connect.on("connected", ()=>{
    console.log("Connected to DB Succesfully")
    server.listen(PORT, ()=>{
    console.log("server is running on port", PORT)
    })
})

