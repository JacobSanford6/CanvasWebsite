import express, { Request, RequestParamHandler, Response } from "express";
import { makeBasicRequest } from "./api/canvasApi";
import { getUserFromCredentials } from "./repos/loginRepo";
import User from "./interfaces/User";
import { getUserFromCookie } from "./repos/cookieRepo";

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded())

app.get('/', (request: Request, response: Response) => {
    makeBasicRequest("courses").then(res => {
        response.json(res)
    })
})


app.post("/canvasRequest",  (request: Request, response: Response) => {
    const data = request.body;

    //if (data && data.cookie && data.)
})

app.post("/loginCookie", async (request: Request, response: Response) => {
    let success: { success: boolean, user?: User } = { "success": true }
    const failure = { "success": false }
    const data = request.body;

    console.log("data")
    console.log(data);

    if (data && data.cookie){
        await getUserFromCookie(data.cookie)
        .then(res => {
            success.user = res;
            response.json(success);
        })
        .catch( () => {
            response.json(failure);
        })
    }else{
        response.json(failure);
    }
})

app.post("/login", async (request: Request, response: Response) => {
    let success: { success: boolean, user?: User } = { "success": true }
    const failure = { "success": false }
    const data = request.body;

    console.log(data);

    if (data && data.username && data.password) {
        await getUserFromCredentials(data.username, data.password).then(res =>{
            success.user = res;
            response.json(success);
        })
        .catch(err => {
            console.error(err);
            response.json(failure);
        })
    } else {
        response.json(failure)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
