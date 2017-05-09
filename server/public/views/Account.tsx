import * as React from 'react';
import Index from './index';
import constants from '../../constants';

interface AccountProps {
	logged?: any,
};

const rol: any = constants.ROL;

export default class Account extends React.Component<AccountProps, undefined> {
	getRol() {
		let userRol: string;

		switch(this.props.logged.rol) {
			case rol.super_admin:
				userRol = 'Super admin';
				break;

			case rol.admin:
				userRol = 'Admin';
				break;

			default:
				userRol = 'Viewer';
		}

		return userRol;
	}

	render() {
		const photo = this.props.logged.photo ? <img className="image" src={`/img/${this.props.logged.photo}`} /> : 'No photo';
		const companyEdit = this.props.logged.rol === rol.super_admin ? <i id="edit-company" className="fa fa-pencil-square-o"></i> : null;
		
		return (
			<Index
				title="Account"
				script="account"
				wrapperClass="account-page"
				logged={this.props.logged}
			>
				<section className="hero is-medium is-info is-bold">
					<div className="hero-body">
						<div className="container">
							<h1 className="title">Account</h1>
							<h2 className="subtitle">Lorem Ipsum is simply dummy text of the printing and typesetting industry</h2>
						</div>
					</div>
				</section>
				<section className="section">
					<div className="container">
						<div className="heading">
							<h1 className="title">Profile</h1>
						</div>
						<hr />
					</div>
				</section>
				<section className="container">
					<div className="columns">
						<div className="column is-half">
							<p className="label">Company {companyEdit}</p>
							<p id="value-company" className="value">{this.props.logged.company.name}</p>
							<p className="label">Rol</p>
							<p className="value">{this.getRol()}</p>
							<p className="label">Name <i id="edit-name" className="fa fa-pencil-square-o"></i></p>
							<p id="value-name" className="value">{this.props.logged.name}</p>
							<p className="label">Last Name <i id="edit-last-name" className="fa fa-pencil-square-o"></i></p>
							<p id="value-last-name"className="value">{this.props.logged.last_name}</p>
							<p className="label">Photo <i className="fa fa-pencil-square-o"></i></p>
							<p className="value">{photo}</p>
						</div>
					</div>
				</section>
			</Index>
		);
	}
}