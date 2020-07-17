const {Router} = require("express")
const User = require("../models").user

const router = new Router()

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