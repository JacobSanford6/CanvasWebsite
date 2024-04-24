import axios, { AxiosHeaders } from 'axios'
import { AxiosResponse } from 'axios'
import { apiKey } from '../apiKey.json'

function generateUrl(path: string, params?: [string, string][]): string{
    let paramsStr: string = "?" + apiKey;
    params?.forEach(param => {
        paramsStr += "&" + param[0] + "=" + param[1]
    });
   
    return "http://localhost:4445/api/v1/" + path + paramsStr;
}

export async function makeRequest(path: string, params?: [string, string][]): Promise<Object[]> {
    const requestUrl = generateUrl(path, params);

    console.log(requestUrl)
    const promise: Promise<Object[]> = new Promise((resolve, reject) => {
        axios.get(requestUrl,
            {
                headers: {
                    "Content-Type": "text/json",
                }
            }
        ).then(res => {
            resolve(res.data);
        }).catch(e => {
            console.error(e)
            reject("Api Request Failed")
        })
    });

    return promise;
}