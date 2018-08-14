import React, { Fragment, Component } from 'react';
import styles from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => { return { showSideDrawer: !prevState.showSideDrawer }});
    }

    render(){
        return (
        <Fragment >
            <Toolbar menuClick={this.sideDrawerToggleHandler}/>
            <SideDrawer closed={this.sideDrawerToggleHandler} open={this.state.showSideDrawer}/>
            <main className={styles.content}>
                {this.props.children}
            </main>
        </Fragment >
        )
    }
};

export default Layout;