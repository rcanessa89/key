/// <reference path="../typings/index.d.ts" />

process.env.ENVIRONMENT = 'test';

import * as mocha from 'mocha';
import * as chai from 'chai';
import app from '../server/index';
import User from '../server/api/entities/user/user.model';

const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('User', () => {
	const testUser = {
		name: 'popin',
		last_name: 'canessa',
		email: 'rcanessa89@hotmail.com'
	};

	beforeEach((done) => {
        User.remove({}, (err) => { 
           done();         
        });     
    });

	describe('/GET /user', () => {
		it('it should GET all the users', done => {
			chai.request(app)
				.get('/api/user')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(0);
					
					done();
				});
		  });
	  });

	describe('/GET /user/:id', () => {
		it('it should GET an user by _id', done => {
			const testUserModel = new User(testUser);

			testUserModel.save((error, user) => {
				const endPoint = '/api/user/' + user._id;

				chai.request(app)
					.get(endPoint)
					.end((error, res) => {
						res.should.have.status(200);
                		res.body.should.be.a('object');
                		res.body.should.have.property('_id').eql(user._id.toString());
                		res.body.should.have.property('name').eql(testUser.name);
                		res.body.should.have.property('last_name').eql(testUser.last_name);
                		res.body.should.have.property('rol').eql('viewer');
                		res.body.should.have.property('photoId').eql(null);
                		res.body.should.have.property('email').eql(testUser.email);
                		res.body.should.have.property('created_at');
                		res.body.should.have.property('updated_at');

						done();
					});
			});
		});
	});

	describe('/POST /user', () => {
		it('it should POST an user', done => {
			chai.request(app)
				.post('/api/user')
	            .send(testUser)
	            .end((err, res) => {
	                res.should.have.status(200);
            		res.body.should.be.a('object');
            		res.body.should.have.property('name').eql(testUser.name);
            		res.body.should.have.property('last_name').eql(testUser.last_name);
            		res.body.should.have.property('rol').eql('viewer');
            		res.body.should.have.property('photoId').eql(null);
            		res.body.should.have.property('email').eql(testUser.email);
            		res.body.should.have.property('created_at');
            		res.body.should.have.property('updated_at');

	              	done();
	            });
		});
	});

	describe('/PATCH /user', () => {
		const testUserModel = new User(testUser);
		const newName = 'Popo';

		it('it should UPDATE an user', done => {
			testUserModel.save((error, user) => {
				chai.request(app)
					.patch('/api/user')
					.send({_id: user._id, name: newName})
					.end((error, res) => {
						res.should.have.status(200);
	                	res.body.should.be.a('object');
	                	res.body.should.have.property('name').eql(newName);

                		done();
					});
			});
		});
	});

	describe('/DELETE /user', () => {
		const testUserModel = new User(testUser);

		it('it should DELETE an user', done => {
			testUserModel.save((error, user) => {
				const endPoint = '/api/user/' + user._id;

				chai.request(app)
					['delete'](endPoint)
					.end((error, res) => {
						res.should.have.status(200);
	                	res.body.should.be.a('object');
	                	res.body.should.have.property('_id').eql(user._id.toString());
	                	res.body.should.have.property('message').eql('Entity deleted.');

	                	done();
					})
			});
		});
	});
});
