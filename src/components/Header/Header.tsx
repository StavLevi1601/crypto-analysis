import React from 'react'
import NavigationBar from '../NavigationBar/NavigationBar'
import style from "../../style/colors.module.scss"

export default function Header() {
    return (
        <div className={style.header}>
            <NavigationBar />
        </div>
    )
}
