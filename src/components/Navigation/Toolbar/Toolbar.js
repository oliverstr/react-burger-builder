import React from 'react';
import styles from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavIems/NavItems';

const Toolbar = (props) => (
    <header className={styles.Toolbar}>
        <div onClick={props.menuClick} className={styles.DrawerToggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div className={styles.LogoWapper}>
            <Logo/>
        </div>
        <nav className={styles.DesktopOnly}>
            <NavItems />
        </nav>
    </header>
);
 
export default Toolbar;