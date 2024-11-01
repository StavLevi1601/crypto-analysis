import React from 'react'
import Image from 'next/image'
import style from "../../style/colors.module.scss"
import logo from "../../assets/images/logo.svg"

export default function NavigationBar() {
    return (
        <>
            <div className={style.logo}>
                <Image src={logo} width={180} height={50} alt="logo" style={{ objectFit: "contain", boxSizing: "border-box" }} />
            </div>
        </>
    )
}
