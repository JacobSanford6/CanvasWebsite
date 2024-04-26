import { useState, useEffect } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import '.././index.css'
import { tryLogin } from '../api/UserServices'

export const LoginPage = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const attemptLogin = async () => {
        await tryLogin(username, password).then(res => {
            if (res.success) {
                console.log(res);
            } else {
                console.log("failed");
            }
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
