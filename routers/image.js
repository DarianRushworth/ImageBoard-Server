const {Router} = require("express")
const Image = require("../models").image

const router = new Router()

router.post(
    "/images",
    async (req, res, next) => {
        try{
            const imageCreator = await Image.create({
                title: req.body.title,
                url: req.body.url
            })
            res.send(`This is your image Title: ${req.body.title}
            and this is your image URL: ${req.body.url}`)

        } catch(error) {
            next(error)
        }
    }
)

router.get(
    "/images/:imageId",
    async (req, res, next) => {
        try{
            const imageId = req.params.imageId
            // console.log("image Id test", imageId)
            const specificImage = await Image.findByPk(imageId)
            const plainSpecificImage = specificImage
                                        ? specificImage.get({
                                            plain: true
                                        })
                                        : res.status(404).send("Image ID not found, try entering a valid ID.")

            // console.log("plain specific test", plainSpecificImage)
            res.status(202).send(plainSpecificImage)

        } catch(error){
            next(error)
        }
    }
)

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