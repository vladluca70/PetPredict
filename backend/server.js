const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const port=5010
const url='mongodb://localhost:27017/pet-prediction';

app=express()
app.use(cors())
app.use(express.json())

mongoose.connect(url, {
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const userSchema = new mongoose.Schema({
    username:{type:String, required:true},
    password:{type:String, required:true}
});
const userModel=mongoose.model('User', userSchema)


app.listen(
    port, ()=>{
        console.log(`it is listening on port ${port}`)
    }
)