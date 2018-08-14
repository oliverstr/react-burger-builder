import React, { Fragment, Component } from 'react';
import styles from './Modal.css';
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.visible !== this.props.visible || nextProps.children !== this.props.children;
    }

    render() {
        return (
        <Fragment>
            <div 
                className={styles.Modal} 
                style={{ 
                    transform: this.props.visible ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.visible ? '1' : '0',
            }}>
            {this.props.children}
            </div>
            <Backdrop show={this.props.visible} clicked={this.props.modalClosed} />
        </Fragment>
    )
    }
}

export default Modal;