const express = require("express")
const userRouter = require("./routers/user")
const imageRouter = require("./routers/image")

const app = express()
const jsonParser = express.json()
const port = 4000

app.use(jsonParser)

app.use(userRouter)
app.use(imageRouter)

function onListen(){
    console.log(`Listening on port: ${port}`)
}

app.listen(
    port,
    onListen
)
