/// <reference path="../../../typings/index.d.ts" />

process.env.ENVIRONMENT = 'test';

import * as mocha from 'mocha';
import * as chai from 'chai';
import app from '../../index';
import Registry from '../entities/registry/registry.model';

const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('Registry', () => {
	const testRegistry = {
		name: 'popin',
		last_name: 'canessa',
		document_id: '603780292',
		host: '58d89d1bf64ea1c2bc737596',
		sign: 'xxx'
	};

	beforeEach((done) => {
		Registry.remove({}, (err) => {
			done();
		});
	});

	describe('/GET /registry', () => {
		it('it should GET all the resgistries', done => {
			chai.request(app)
				.get('/api/registry')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(0);
					done();
				});
		});
	});

	describe('/GET /registry/:id', () => {
		it('it should GET an registry by _id', done => {
			const testRegistryModel = new Registry(testRegistry);

			testRegistryModel.save((error, registry) => {
				const endPoint = '/api/registry/' + registry._id;

				chai.request(app)
					.get(endPoint)
					.end((error, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('_id').eql(registry._id.toString());
						res.body.should.have.property('name').eql(testRegistry.name);
						res.body.should.have.property('last_name').eql(testRegistry.last_name);
						res.body.should.have.property('document_id').eql(testRegistry.document_id);
						res.body.should.have.property('sign').eql(testRegistry.sign);
						res.body.should.have.property('host');
						res.body.should.have.property('created_at');
						res.body.should.have.property('updated_at');

						done();
					});
			});
		});
	});

	describe('/POST /registry', () => {
		it('it should POST an registry', done => {
			chai.request(app)
				.post('/api/registry')
				.send(testRegistry)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('name').eql(testRegistry.name);
					res.body.should.have.property('last_name').eql(testRegistry.last_name);
					res.body.should.have.property('document_id').eql(testRegistry.document_id);
					res.body.should.have.property('sign').eql(testRegistry.sign);
					res.body.should.have.property('host');
					res.body.should.have.property('created_at');
					res.body.should.have.property('updated_at');

					done();
				});
		});
	});

	describe('/PATCH /registry', () => {
		const testRegistryModel = new Registry(testRegistry);
		const newName = 'Popo';

		it('it should UPDATE an registry', done => {
			testRegistryModel.save((error, registry) => {
				chai.request(app)
					.patch('/api/registry')
					.send({_id: registry._id, name: newName})
					.end((error, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('name').eql(newName);

						done();
					});
			});
		});
	});

	describe('/DELETE /registry', () => {
		const testRegistryModel = new Registry(testRegistry);

		it('it should DELETE an registry', done => {
			testRegistryModel.save((error, registry) => {
				const endPoint = '/api/registry/' + registry._id;

				chai.request(app)
					['delete'](endPoint)
					.end((error, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('_id').eql(registry._id.toString());
						res.body.should.have.property('message').eql('Entity deleted.');

						done();
					});
			});
		});
	});
});
