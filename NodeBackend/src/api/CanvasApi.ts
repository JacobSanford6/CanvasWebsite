import { apiKey } from './apiKey.json'

function generateUrl(path: string, params?: [string, string][]): string {
    let paramsStr: string = "?" + apiKey;
    params?.forEach(param => {
        paramsStr += "&" + param[0] + "=" + param[1]
    });

    return "https://mycourses.southeast.edu/api/v1/" + path + paramsStr;
}

export async function makeBasicRequest(path: string, params?: [string, string][]): Promise<Object[]> {
    const requestUrl = generateUrl(path, params);

    console.log(requestUrl)
    const promise: Promise<Object[]> = new Promise((resolve, reject) => {
        fetch(requestUrl,
            {
                headers: {
                    "Content-Type": "text/json",
                }
            }
        ).then(res => {
            resolve(res.json());
        }).catch(e => {
            console.error(e)
            reject("Api Request Failed")
        })
    });

    return promise;
}