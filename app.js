const express = require("express");
const mongoose = require('mongoose');
const app = express();
const port = 3000;

const mongoUrl = 'mongodb://127.0.0.1:27017/Tourism';

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on("error", console.error.bind(console, "mongoDB connection error: "));
db.once("open", () => {
    console.log('connected to mongodb database');
});


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model("user", userSchema)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", 'ejs');
app.use(express.static('./public'));

app.get('/', (req, res) =>{
    res.render('grnd');
})
app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({email, password})
        if(user){
            // res.json({ success: true, message: "successfully login!" });
            res.redirect('/main')
        }else{
            res.status(401).json({ success : false, message:"Invalid email or password please try again!"});
        }
    }catch(error){
        console.error("Error during login", error);
        res.status(500).json({ success:false, message:" internal server error "});
    }
});


app.get('/signup',(req, res) => {
    // res.send("hello world!");n
    res.render('signup');
})

app.post("/signup", async(req, res)=>{
    const formData = req.body;
    try{
        // console.log("form data:",formData)

        const existingUser = await User.findOne({ email: formData.email });
        if(existingUser){
            res.status(400).send('Email already exists. Please use a different email.');
            console.log("Existing user:",existingUser)
        }else{
            await User.create(formData);
            // res.send("Form submitted successfully");
            // console.log("form submitted successfully");
            res.redirect('login')
        }
    }catch(err){
        console.log("Something went wrong", err);
        res.status(500).send(" internal server error ");
    }
});

app.get('/main', (req, res) => {
    res.render('main');
})

app.listen(port, () => {
    console.log(`the port is running at ${port}`)
});

