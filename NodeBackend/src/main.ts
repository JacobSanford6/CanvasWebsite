import express, { Request, RequestParamHandler, Response } from "express";
import { makeBasicRequest } from "./api/CanvasApi";
import { checkCredentials } from "./repos/loginRepo";

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded())

app.get('/', (request: Request, response: Response) => {
    makeBasicRequest("courses").then(res => {
        response.json(res)
    })
})


app.get("/login", (request: Request, response: Response) => {

    console.log(request.body)
    console.log(request.params)


    response.json({ "LOL": "ASDF" })
    //if ("password" in request.params)
})

app.post("/login", (request: Request, response: Response) => {
    

    const success = { "success": true }
    const failure = { "success": false }
    const data = request.body;

    if (data && data.username && data.password) {
        checkCredentials(data.username, data.password);
        if (data.username === "jake" && data.password === "jake") {
            response.json(success);
        } else {
            response.json(failure);
        }
    } else {
        response.json(failure)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
