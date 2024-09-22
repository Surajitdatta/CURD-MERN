const express = require("express")
const cors = require("cors");
require("dotenv").config()
const app = express()
const mongoose = require("mongoose")
const Product = require("./models/product.model.js")
const productRoute = require("./Route/product.route.js")

app.use(express.json());
app.use(cors())

app.get('/', (req, res)=>{
    res.status(200).send("Hello from NODE Api Server")
})

// route 
app.use("/api/products", productRoute)






mongoose.connect('mongodb+srv://bubuldatta91314:hBvtsQmuNjGIL1Zh@cluster0.xfeq6.mongodb.net/Curd-API?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected!'))
  .catch((err)=> console.log("Failed to connect", err))







  const port = process.env.PORT || 3000
  app.listen(port, ()=>{
      console.log("The server is started on ", port)
  })



// mongodb+srv://bubuldatta91314:<db_password>@cluster0.xfeq6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0