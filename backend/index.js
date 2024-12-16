const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const authrouter =require('./routes/authrouter');
const productrouter=require('./routes/productrouter');
require('dotenv').config();
require ('./Models/db');
const PORT=process.env.PORT ||8080

app.get('/ping',(req,res)=>{
    res.send('PONG');
});
app.use(bodyParser.json());
app.use(cors());  
app.use('/auth',authrouter);
app.use('/products',productrouter);
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
});