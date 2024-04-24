import axios, { AxiosHeaders } from 'axios'
import { AxiosResponse } from 'axios'
import { apiKey } from '../apiKey.json'



export async function tryLogin(username: string, password: string): Promise<boolean> {
    const promise: Promise<boolean> = new Promise((resolve, reject) => {
        axios.post("http://localhost:4445/backendApi/login",
            { "username": username, "password": password })
            .then(res => {
                if (res.data) {
                    if (res.data.success === true) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            }).catch(e => {
                console.error(e)
                reject("Api Request Failed")
            })
    });

    return promise;
}