/// <reference path="../../../typings/index.d.ts" />

process.env.ENVIRONMENT = 'test';

import * as mocha from 'mocha';
import * as chai from 'chai';
import app from '../../index';
import Host from '../entities/host/host.model';

const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('Host', () => {
	const testHost = {
		name: 'popin',
		last_name: 'canessa',
		email: 'rcanessa89@hotmail.com'
	};

	beforeEach((done) => {
		Host.remove({}, (err) => {
			done();
		});
	});

	describe('/GET /host', () => {
		it('it should GET all the hosts', done => {
			chai.request(app)
				.get('/api/host')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(0);
					done();
				});
		});
	});

	describe('/GET /host/:id', () => {
		it('it should GET an host by _id', done => {
			const testHostModel = new Host(testHost);

			testHostModel.save((error, host) => {
				const endPoint = '/api/host/' + host._id;

				chai.request(app)
					.get(endPoint)
					.end((error, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('_id').eql(host._id.toString());
						res.body.should.have.property('name').eql(testHost.name);
						res.body.should.have.property('last_name').eql(testHost.last_name);
						res.body.should.have.property('email').eql(testHost.email);
						res.body.should.have.property('created_at');
						res.body.should.have.property('updated_at');

						done();
					});
			});
		});
	});

	describe('/POST /host', () => {
		it('it should POST an host', done => {
			chai.request(app)
				.post('/api/host')
				.send(testHost)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('name').eql(testHost.name);
					res.body.should.have.property('last_name').eql(testHost.last_name);
					res.body.should.have.property('email').eql(testHost.email);
					res.body.should.have.property('created_at');
					res.body.should.have.property('updated_at');

					done();
				});
		});
	});

	describe('/PATCH /host', () => {
		const testHostModel = new Host(testHost);
		const newName = 'Popo';
		const newEmail = 'rcanessa@hormail.com';

		it('it should UPDATE an host', done => {
			testHostModel.save((error, host) => {
				chai.request(app)
					.patch('/api/host')
					.send({_id: host._id, name: newName, email: newEmail})
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

	describe('/DELETE /host', () => {
		const testHostModel = new Host(testHost);

		it('it should DELETE an host', done => {
			testHostModel.save((error, host) => {
				const endPoint = '/api/host/' + host._id;

				chai.request(app)
					['delete'](endPoint)
					.end((error, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('_id').eql(host._id.toString());
						res.body.should.have.property('message').eql('Entity deleted.');

						done();
					});
			});
		});
	});
});
