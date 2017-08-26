process.env.ENVIRONMENT = 'test';

import * as mocha from 'mocha';
import * as chai from 'chai';
import app from '../../index';
import Company from '../entities/company/company.model';
import User from '../entities/user/user.model';

const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('Company', () => {
	const testCompany: any = {
		name: 'konrad',
		email: 'konrad@konradgroup.com',
		departments: [],
		registries: [],
		assets: []
	};

	beforeEach(done => {
		Company.remove({}, error => {
			User.remove({}, error => done());
		});
	});

	describe('/GET /company', () => {
		it('it should GET all the companies', done => {
			chai.request(app)
				.get('/api/company')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(0);

					done();
				});
		});
	});

	describe('/GET /company/id/:id', () => {
		it('it should GET a company by _id', done => {
			const testCompanyModel: any = new Company(testCompany);

			testCompanyModel.save((error, company) => {
				const endPoint: string = `/api/company/id/${company._id}`;

				chai.request(app)
					.get(endPoint)
					.end((error, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('_id').eql(company._id.toString());
						res.body.should.have.property('name').eql(testCompany.name);
						res.body.should.have.property('departments').be.a('array').length.be(0);
						res.body.should.have.property('registries').be.a('array').length.be(0);
						res.body.should.have.property('assets').be.a('array').length.be(0);
						res.body.should.have.property('created_at');
						res.body.should.have.property('updated_at');

						done();
					});
			});
		});
	});

	describe('/POST /company', () => {
		it('it should POST a company', done => {
			chai.request(app)
				.post('/api/company')
				.send(testCompany)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('name').eql(testCompany.name);
					res.body.should.have.property('departments').be.a('array').length.be(0);
					res.body.should.have.property('registries').be.a('array').length.be(0);
					res.body.should.have.property('assets').be.a('array').length.be(0);
					res.body.should.have.property('created_at');
					res.body.should.have.property('updated_at');

					done();
				});
		});
	});

	describe('/PATCH /company', () => {
		const testCompanyModel = new Company(testCompany);
		const newName: string = 'google';

		it('it should UPDATE a company', done => {
			testCompanyModel.save((error, company) => {
				chai.request(app)
					.patch('/api/company')
					.send({ _id: company._id, name: newName })
					.end((error, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('name').eql(newName);

						done();
					});
			});
		});
	});

	describe('/DELETE /company', () => {
		const testCompanyModel: any = new Company(testCompany);

		it('it should DELETE a company', done => {
			testCompanyModel.save((error, company) => {
				const endPoint: string = `/api/company/id/${company._id}`;

				chai.request(app)
					['delete'](endPoint)
					.end((error, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('_id').eql(company._id.toString());
						res.body.should.have.property('message').eql('Entity deleted.');

						done();
					});
			});
		});
	});

	describe('/POST /company-admin', () => {
		const objReq: any = {
			company: 'company test',
			name: 'name test',
			last_name: 'last name test',
			email: 'email@test.com'
		};

		it('it should create a company with a user with role "super_admin"', done => {
			chai.request(app)
				.post('/api/company-admin')
				.send(objReq)
				.end((error, res) => {
					if (error) {
						done();
					}

					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('_id');
					res.body.should.have.property('company');
					res.body.should.have.property('name').eql(objReq.name);
					res.body.should.have.property('last_name').eql(objReq.last_name);
					res.body.should.have.property('email').eql(objReq.email);

					done();
				});
		});

		it('it should verified a duplicate company name or user email', done => {
			const testCompanyModel = new Company(testCompany);

			testCompanyModel.save((error, company) => {
				const testUser: any = {
					name: 'Rodolfo',
					last_name: 'Canessa',
					email: 'rcanessa89@hotmail.com',
					company: company._id
				};
				const testUserModel = new User(testUser);

				testUserModel.save((error, user) => {
					chai.request(app)
						.post('/api/company-admin')
						.send({ company: testCompany.name, email: testUser.email })
						.end((error, res) => {
							if (error) {
								done();
							}

							res.should.have.status(200);
							res.body.should.be.a('object');
							res.body.should.have.property('company').eql('That company name already exist');
							res.body.should.have.property('email').eql('That email is already registered');

							done();
						});
				});
			});
		});
	});
});
