const express = require("express");
const app = express()
const quotes = require("./quotes.json");
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/notesRoutes");
const mongose = require("mongoose");
const dotenv = require("dotenv");
const cors =  require("cors");

dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/users",userRouter);
app.use("/note",noteRouter);

const PORT = process.env.PORT || 5000

mongose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT,()=>{
        console.log("Server started at "+ PORT);
        });

}).catch((error=>{
    console.log(error);
}))



app.get("/",(req,res)=>{
res.send("Notes API")
});

app.get("/quotes",(req,res)=>{
    res.status(200).json(quotes)
    });

app.get("/random",(req,res)=>{
    let index = Math.floor(Math.random()* quotes.length)
    let quote = quotes[index]
    res.status(200).json(quote)

})

