import axios, { AxiosHeaders } from 'axios'
import { AxiosResponse } from 'axios'
import { apiKey } from '../apiKey.json'
import User from '../interfaces/User';



export async function tryLogin(username: string, password: string): Promise<User> {
    const promise: Promise<User> = new Promise((resolve, reject) => {
        axios.post("http://localhost:4445/backendApi/login",
            { "username": username, "password": password })
            .then(res => {
                if (res.data) {
                    resolve(res.data);
                }
            }).catch(e => {
                console.error(e)
                reject("Api Request Failed")
            })
    });

    return promise;
}