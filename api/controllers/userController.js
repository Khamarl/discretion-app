const User = require("../models/User")
const Token = require("../models/Token")

const bcrypt = require('bcrypt')



async function register (req, res) {
    try {
        const data = req.body;

        //generate a salt with a specific cost 
            const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS))

        // hash the password 
        data["password"] = await bcrypt.hash(data["password"], salt);


        const result = await User.create(data);
        res.status(201).send(result);
    } catch (err) {
        res.status(400).json({"error": err.message})
    }
};

async function show (req, res) {
    try {
        const id = parseInt(req.params.id);
        const user = await User.getOneById(id);
        res.json(user);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
};

async function login (req, res) {
    try{
        const user = await User.getOneByUsername(req.body.username);

        const authenticated = await bcrypt.compare(req.body.password, user["password"])
        console.log(authenticated)

        if(!authenticated) {
          throw new Error("Incorrect credentials")
        
          //if user is authenticated, we want to send them a token 

        } else {
            console.log(user["id"])
            //create token using create function in token model and store in token variable 
            const token = await Token.create(user["id"])

            //store users token as a cookie so that user does not have to log in every time 
            res.cookie("discretionUser", token.token, { maxAge: 36000000})
            res.status(200).json({authenticated: true})
        }
    } catch(err){
        res.status(403).json({error: err.message})
    }
}

function logout(req,res) {
    res.clearCookie("discretionUser");
    res.status(204).end()
}



module.exports = {
    register, show, login, logout
}
