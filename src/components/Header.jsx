import React from 'react'
import { useSelector } from 'react-redux';


export default function Header() {
    const state = useSelector((state) => state.myState)
    return (
        <div className="header-container">

            <div style={{ top: state.alert[1] === true ? "90px" : "-20vh", backgroundColor: state.alert[2] === "error" ? "crimson" : "mediumseagreen" }} className="alert">{state.alert[0]}</div>

            <div className="header">
                <h1>TIC TAC TOE</h1>
            </div>
        </div>
    )
}
