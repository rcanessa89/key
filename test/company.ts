/// <reference path="../typings/index.d.ts" />

process.env.ENVIRONMENT = 'test';

import * as mocha from 'mocha';
import * as chai from 'chai';
import app from '../server/index';
import Company from '../server/api/entities/company/company.model';


const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('Company', ()=> {
	const testCompany = {
		name: 'konrad',
		email: 'konrad@konradgroup.com',
		departments: [],
		registries: [],
		assets: []
	};

	beforeEach((done) => {
        Company.remove({}, (err) => { 
           done();         
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

	describe('/GET /company/:id', () => {
		it('it should GET an company by _id', done => {
			const testCompanyModel = new Company(testCompany);

			testCompanyModel.save((error, company) => {
				const endPoint = '/api/company/' + company._id;

				chai.request(app)
					.get(endPoint)
					.end((error, res) => {
						res.should.have.status(200);
                		res.body.should.be.a('object');
                		res.body.should.have.property('_id').eql(company._id.toString());
                		res.body.should.have.property('name').eql(testCompany.name);
                		res.body.should.have.property('email').eql(testCompany.email);
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
		it('it should POST an company', done => {
			chai.request(app)
				.post('/api/company')
	            .send(testCompany)
	            .end((err, res) => {
	                res.should.have.status(200);
            		res.body.should.be.a('object');
            		res.body.should.have.property('name').eql(testCompany.name);
            		res.body.should.have.property('email').eql(testCompany.email);
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
		const newName = 'google';
		const newEmail = 'google@gmail.com';

		it('it should UPDATE an user', done => {
			testCompanyModel.save((error, company) => {
				chai.request(app)
					.patch('/api/company')
					.send({_id: company._id, name: newName, email: newEmail})
					.end((error, res) => {
						res.should.have.status(200);
	                	res.body.should.be.a('object');
	                	res.body.should.have.property('name').eql(newName);
            			res.body.should.have.property('email').eql(newEmail);

                		done();
					});
			});
		});
	});

	describe('/DELETE /company', () => {
		const testCompanyModel = new Company(testCompany);

		it('it should DELETE an company', done => {
			testCompanyModel.save((error, company) => {
				const endPoint = '/api/company/' + company._id;

				chai.request(app)
					['delete'](endPoint)
					.end((error, res) => {
						res.should.have.status(200);
	                	res.body.should.be.a('object');
	                	res.body.should.have.property('_id').eql(company._id.toString());
	                	res.body.should.have.property('message').eql('Entity deleted.');

	                	done();
					})
			});
		});
	});
});

