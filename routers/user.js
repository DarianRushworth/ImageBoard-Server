const {Router} = require("express")
const User = require("../models").user
const bcrypt = require("bcrypt")

const router = new Router()

router.post(
    "/users",
    async (req, res, next) => {
        try{
            const userCreator = await User.create({
                fullName: req.body.fullName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10)
            })
            if(!userCreator){
                res.status(400).send("Oops something went wrong, please re enter your credentials.")
            } else {
                res.status(202).send(userCreator)
            }

        } catch(error){
            next(error)
        }
    }
)

router.get(
    "/users",
    async (req, res) => {
        try{
        const allUsers = await User.findAll()
        console.log("user test", allUsers)
        res.send(allUsers)

    } catch (error){
        console.log(error.message)
    }
}
)
module.exports = router