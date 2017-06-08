import React from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

class DeskUserMenu extends React.PureComponent {
    render() {
        return (
            <div className="desk-menu-user">
                <div className="menu-button-container">
                    <img src="http://via.placeholder.com/40x40" />
                    <span>Menu</span>
                    <i className="fa fa-sort-desc" />
                </div>
                <div className="menu">
                    <ul>
                        <li><a href="/account"><span><i className="fa fa-id-card-o" /></span>Account</a></li>
                        <li><a href="/"><span><i className="fa fa-home" /></span>Site Home</a></li>
                        <li><a href="/api/logout"><span><i className="fa fa-sign-out" /></span>Log Out</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default DeskUserMenu;
