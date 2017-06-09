import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import ClickOut from '../click-out/ClickOut.component';

const propTypes = {
    showMenu: Proptypes.bool.isRequired,
};

const DeskUserMenu = (props) => {
    const hideMenu = () => {
        if (props.showMenu) {
            props.setShowMenu(false);
        }
    };

    const showMenu = () => {
        if (!props.showMenu) {
            props.setShowMenu(true);
        }
    };

    const menu = props.showMenu ? (
        <div className="menu">
            <ul>
                <li><a href="/account"><span><i className="fa fa-id-card-o" /></span>Account</a></li>
                <li><a href="/"><span><i className="fa fa-home" /></span>Site Home</a></li>
                <li><a href="/api/logout"><span><i className="fa fa-sign-out" /></span>Log Out</a></li>
            </ul>
        </div>
    ) : null;

    const menuButtonContainerClassName = classnames({
        'menu-button-container': true,
        active: props.showMenu,
    });

    return (
        <div className="desk-menu-user">
            <ClickOut onOut={hideMenu}>
                <div>
                    <div
                        className={menuButtonContainerClassName}
                        onClick={showMenu}
                    >
                        <img src="http://via.placeholder.com/40x40" />
                        <span>Menu</span>
                        <i className="fa fa-sort-desc" />
                    </div>
                    {menu}
                </div>
            </ClickOut>
        </div>
    );
}

DeskUserMenu.propTypes = propTypes;

export default DeskUserMenu;
