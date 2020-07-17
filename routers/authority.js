const { Router } = require('express')
const { toJWT, toData } = require('../authority/jsonWebToken')
const User = require("../models").user
const bcrypt = require("bcrypt")
const AuthorityMiddleware = require("../authority/middleware")

const router = new Router()

router.post(
    "/login", 
    async (req, res, next) => {
        try{
            const {email, password} = req.body
            if(!email || !password){
                return res.status(400).send("Please fill in email and password correctly")
            } else {
                const user = await User.findOne({where: {email}})
                // console.log("user test", user)
                if(!user){
                    return res.status(404).send("User not found")
                } else {
                    // console.log("import password test", password)
                    // console.log("User's password test", user.password)
                    const passwordMatch = bcrypt.compareSync(password, user.password)
                    if(passwordMatch){
                        const token = toJWT({userId: user.id})
                        console.log("token test", token)
                        res.send("Login Successful")
                    } else {
                        res.send("Unauthorized")
                    }
                }
            }

        } catch(error){
            next(error)
        }
    })

router.get(
    "/auth/login",
    AuthorityMiddleware
)

module.exports = router