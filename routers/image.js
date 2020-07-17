const {Router} = require("express")
const Image = require("../models").image

const router = new Router()

router.get(
    "/images",
    async (req, res) => {
        try{
            const allImages = await Image.findAll()
            res.send(allImages)
            console.log("images test", allImages)
            
        } catch(error){
            console.log(error.message)
        }
    }
)
module.exports = router