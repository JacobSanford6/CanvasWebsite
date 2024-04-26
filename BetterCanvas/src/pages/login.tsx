import { useState, useEffect } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import '.././index.css'
import { tryCookie, tryLogin } from '../api/UserServices'
import { useCookies } from 'react-cookie'

export const LoginPage = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const attemptLogin = async () => {
        await tryLogin(username, password).then(res => {
            if (res.success) {
                if (res.user?.cookie){
                    const expireDate = new Date()
                    // cookie expire in 29 days
                    expireDate.setTime(expireDate.getTime() + (29*24*60*60*1000) )
                    document.cookie = `authCookie=${res.user.cookie};expires${expireDate}`
                }else{
                    console.log("failed");
                }
            } else {
                console.log("failed");
            }
        }).finally(()=>{
            document.location.assign("/home")
        })
    }

    return (
        <form>
            <div>
                <label htmlFor="username" >Username: </label>
                <input type='text' id="username" value={username} onChange={e => setUsername(e.target.value)}></input>
            </div>

            <div>
                <label htmlFor="password" >Password: </label>
                <input type='password' id="password" value={password} onChange={e => setPassword(e.target.value)}></input>
            </div>

            <button type='button' onClick={attemptLogin}></button>
        </form>
    )
}
