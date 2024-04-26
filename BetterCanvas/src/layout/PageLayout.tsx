import React from "react"
import "../index.css"
import { useEffect } from "react"
import { tryCookie } from "../api/UserServices"
import { useCookies } from 'react-cookie'

interface layoutProps {
    children?: React.ReactNode
}

const PageLayout = (layoutProps: layoutProps) => {
    return (
        <div id="main">
            <div id="nav">
                <a href="/home" className="hoverBorderPurple">Home</a>
                <a href="/classes/grades" className="hoverBorderPurple">Grades</a>
            </div>

            <div style={{ minHeight: 'calc(90vh - 9.5rem)' }}>
                {layoutProps.children}


            </div>

            <div id="footer">
                <a>&copy;2024 Jake Sanford</a>
            </div>
        </div >
    )
}

export default PageLayout