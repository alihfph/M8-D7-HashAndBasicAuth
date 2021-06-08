import express from "express"
import mongoose from "mongoose"
import listEndpoints from "express-list-endpoints"
import usersRouter from "./services/users/index.js" 
import authorsRouter from "./services/authors/index.js";
import {
    notFoundErrorHandler,
    badRequestErrorHandler,
    catchAllErrorHandler,
  } from "./errorHandlers.js";

const server = express()
const PORT = process.env.PORT || 3001

server.use(express.json())
console.table(listEndpoints(server))

server.use("/articles", usersRouter);
server.use("/authors", authorsRouter);

server.use(badRequestErrorHandler);
server.use(notFoundErrorHandler);
server.use(catchAllErrorHandler);


mongoose.connect(process.env.MONGO_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true  })

mongoose.connection.on("connected", ()=>{
    console.log("Connected to DB Succesfully")
    server.listen(PORT, ()=>{
    console.log("server is running on port", PORT)
    })
})

