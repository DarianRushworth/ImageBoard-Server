const {toData} = require("./jsonWebToken")

const authorityMiddleware = (req, res, next) => {
    const auth = req.headers.authorization && req.headers.authorization.split(" ")
    if(auth && auth[0] === "Bearer" && auth[1]){
        try{
            const data = toData(auth[1])
            res.status(202).send(`Middle Successful ${data}`)

        } catch(error){
            next(error)
        }
    }
}
module.exports = authorityMiddleware