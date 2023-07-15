const Customer = require('../models/customer')
const Admin = require('../models/admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const TOKEN_KEY = process.env.TOKEN_KEY

const register =  async (req, res) =>  {
    try {
        // - get user input
        const { firstname, lastname, 
            email, password } = Object.keys(req.query).length === 0 ? req.body : req.query
        

        // - validate user input
        if (!(email && password && firstname && lastname)) {
            return res.status(400).send("All input is required")
        }

        // - validate if user already registered
        const registeredCustomer = await Customer.findOne({email})
        if (registeredCustomer) {
            return res.status(400).send("This email is already registered.")
        }

        // - encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10)

        // - create user in database
        const customer = await Customer.create({
            firstname,
            lastname,
            email: email.toLowerCase(),
            password: encryptedPassword
        })

        // - response new user if success
        res.status(200).json(customer)
    } catch (error) {
        console.log(error)
    }
}

const login = async (req, res) => {
    try {
        // - get user input
        const { email, password } = req.body

        // - validate user input
        if(!(email && password)) {
            return res.status(400).send("All input is required")
        }

        // - validate user password and if use has registered
        const user = await Customer.findOne({email})
        const admin = await Admin.findOne({email})
        if(user && (await bcrypt.compare(password, user.password))) {
            // - create token
            const token = jwt.sign(
                {user_id: user._id, firstname: user.firstname || "", lastname: user.lastname || "", role: 'customer' },
                TOKEN_KEY,
                {
                    expiresIn: "1h",
                }
            )
            // console.log(token, 'user')
            res.status(200).json({...user, token})
        }else if(admin && (await bcrypt.compare(password, admin.password))){
            // - create token
            const token = jwt.sign(
                {user_id: admin._id, firstname:  "", lastname: "", role: 'admin' },
                TOKEN_KEY,
                {
                    expiresIn: "1h",
                }
            )
            // console.log(token, 'admin')
            res.status(200).json({...admin, token})
        }else{
            res.status(400).send("Invalid Credentials")
        }
    } catch (error) {
        console.log(error)
    }
}

const getUserByID = async(req, res) => {
    try {
        const { _userID } = Object.keys(req.query).length === 0 ? req.body : req.query
        if(!_userID) {
            res.status(400).send("_userID is required")
        }

        // - get user
        const user = await Customer.findOne({_id:_userID}) || await Admin.findOne({_id:_userID})

        if (user){
            res.status(200).json(user)
        }else{
            res.status(400).send("User not found")
        }
    } catch (error) {
        console.log(error)
    }
}

const updateUserByID = async(req, res) => {
    try {

        const {_userID ,firstname, lastname, account} = req.body  

        // const token = req.cookies.token
        // if (!token){
        //     res.status(400).send("Token required")
        //     return;
        // }
        // const decodedToken = jwt.decode(token);
        // const _userID = decodedToken.user_id
        const user = await Customer.findOne({_id:_userID})
        const admin = await Admin.findOne({_id: _userID})
        if (user) {
            const updatedCustomer = await Customer.findOneAndUpdate(
                {_id:_userID},
                {
                    firstname: firstname , 
                    lastname: lastname, 
                    account: account
                },
                {new:true}
            )
            res.status(200).json(updatedCustomer)
        }
        else if(admin) {
            res.status(200).send("Admin found, no need to update account")
        }
        else{
            res.status(400).send("User not found")
        }
    } catch (error) {
        console.log(error)
    }
}


const createAdmin = async (req, res) => {
    try {
        const { email, password } = req.body
        encryptedPassword = await bcrypt.hash(password, 10)
        const admin = await Admin.create({
            email: email.toLowerCase(),
            password: encryptedPassword
        })

        res.status(201).json(admin)

    } catch (error) {
        console.log(error)
    }
}

const logout = async (req, res) => {
    try {
        const token = req.cookies.token
        if(token){
            const decodedToken = jwt.decode(token);
            const user_id = decodedToken.user_id
            
            res.clearCookie('token')
            res.status(200).send(`userID: ${user_id} has logout successfully`)
        }else{
            res.status(400).send(`user hasnot login yet`)
        }
    } catch (error) {
        console.log(error)
    }
}

const decodeToken = async (req, res) => {
    try {
        const { token } = Object.keys(req.query).length === 0 ? req.body : req.query
        if (JSON.stringify(token) === '{}'){
            res.status(400).send("User has no token")
            return;
        }
        // - get user_id from token in the cookie
        const decodedToken = jwt.decode(token)
        res.status(200).json(decodedToken)
    } catch (error) {
        res.status(400).send("Invalid Token")
    }
}

module.exports = {
    register,
    login,
    createAdmin,
    getUserByID,
    updateUserByID,
    logout,
    decodeToken
}