import React from 'react';
import styles from './NavItems.css';
import NavItem from './NavItem/NavItem';

const NavItems = () => (
    <ul className={styles.NavItems}>
        <NavItem link="/burger">Burger Builder</NavItem>
        <NavItem link="/orders">Orders</NavItem>
    </ul>
);
 
export default NavItems;