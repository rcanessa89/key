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
		const imgSrc = `/api/img/${this.props.logged.photo}`;
		const containerClassname = this.props.logged.photo ? 'photo-container' : 'photo-container hide';
		const companyEdit = this.props.logged.rol === rol.super_admin ? <i id="edit-company" className="fa fa-pencil-square-o"></i> : null;
		const photo = (
			<div id="photo-container" className={containerClassname}>
				<figure className="image is-128x128">
					<img id="photo-img" src={imgSrc} />
				</figure>
				<p>No photo</p>
			</div>
		);
		
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
				<section className="container container-mobile-padding">
					<div className="columns">
						<div className="column is-half">
							<p className="label">Company {companyEdit}</p>
							<p id="value-company" className="value">{this.props.logged.company.name}</p>
							<p className="label">Email <i id="edit-email" className="fa fa-pencil-square-o"></i></p>
							<p id="value-email" className="value">{this.props.logged.email}</p>
							<p className="label">Name <i id="edit-name" className="fa fa-pencil-square-o"></i></p>
							<p id="value-name" className="value">{this.props.logged.name}</p>
							<p className="label">Last Name <i id="edit-last_name" className="fa fa-pencil-square-o"></i></p>
							<p id="value-last_name"className="value">{this.props.logged.last_name}</p>
							<p className="label">Rol</p>
							<p className="value">{this.getRol()}</p>
							<p className="label">Photo <label htmlFor="photo-input"><i className="fa fa-pencil-square-o"></i></label></p>
							{photo}
							<input id="photo-input" className="photo-input" type="file" />
							<div id="error-container" className="error-field">
								<article className="message is-danger">
									<div className="message-body"></div>
								</article>
							</div>
						</div>
					</div>
				</section>
			</Index>
		);
	}
}