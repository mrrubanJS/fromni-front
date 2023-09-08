import { Link, Outlet } from "react-router-dom";
import React from 'react'
import styles from './Layout.module.css'


const Layout = () => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.header__container}>

        <div className={styles.header__logo}>Fromni</div>
        <div className={styles.header__menu}>

        <Link className={styles.header__link} to="/" >Messages</Link>
        <Link className={styles.header__link} to="/Channels">Channels</Link>
        </div>
        </div>
      </header>
      <Outlet/>
    </div>
  )
}

export default Layout