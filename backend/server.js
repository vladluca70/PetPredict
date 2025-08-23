const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const bcrypt=require('bcrypt')
const port=5010
const url='mongodb://localhost:27017/pet-prediction';

const app=express()
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


app.post('/login', async(req, res) => {
    try {
        const username=req.body.username
        const password=req.body.password

         const usernameExists=await userModel.findOne({username:username})
        if(usernameExists){
            const isPasswordValid= await bcrypt.compare(password, usernameExists.password)
            if(isPasswordValid){
                console.log("password valid")
                res.status(200).json({message:"log in succesful"})
            }
            else{
                console.log("password invalid")
                res.status(401).json({message:"password invalid"})
            }
        }
        else{
            console.log("user not found in database")
            res.status(401).json({message:"user not found in database"})
        }        

    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post('/signup', async(req, res)=>{
    const username=req.body.username
    const password=req.body.password

    if(!username){
        return res.status(400).json({message:"username is required"})
    }
    if(!password){
        return res.status(400).json({message:"password is required"})
    }

    try {
        const usernameExists= await userModel.findOne({username:username})
        if(usernameExists){
            console.log(`${username} already exists in database`);
            return res.status(409).json({ message: "username already exists" });
        }
        else{
            const salt = await bcrypt.genSalt(10); 
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new userModel({
                username: username,
                password: hashedPassword
            });

            await newUser.save();

            console.log(`${username} has been registered successfully`);
            return res.status(201).json({ message: "user registered successfully" });
        }

    } catch (error) {
        console.error("signup server error", error);
        res.status(500).json({ message: "internal server error" });
    }
});

app.listen(
    port, ()=>{
        console.log(`it is listening on port ${port}`)
    }
)