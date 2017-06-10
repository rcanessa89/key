/// <reference path="../../../typings/index.d.ts" />

process.env.ENVIRONMENT = 'test';

import * as mocha from 'mocha';
import * as chai from 'chai';
import app from '../../index';
import People from '../entities/people/people.model';

const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('People', () => {
	const testPeople = {
		name: 'popin',
		last_name: 'canessa',
		document_id: '603780292',
		host: '58d89d1bf64ea1c2bc737596',
		sign: 'xxx'
	};

	beforeEach((done) => {
		People.remove({}, (err) => {
			done();
		});
	});

	describe('/GET /people', () => {
		it('it should GET all the resgistries', done => {
			chai.request(app)
				.get('/api/people')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(0);
					done();
				});
		});
	});

	describe('/GET /people/id/:id', () => {
		it('it should GET people by _id', done => {
			const testPeopleModel = new People(testPeople);

			testPeopleModel.save((error, people) => {
				const endPoint = '/api/eople/id/' + people._id;

				chai.request(app)
					.get(endPoint)
					.end((error, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('_id').eql(people._id.toString());
						res.body.should.have.property('name').eql(testPeople.name);
						res.body.should.have.property('last_name').eql(testPeople.last_name);
						res.body.should.have.property('document_id').eql(testPeople.document_id);
						res.body.should.have.property('sign').eql(testPeople.sign);
						res.body.should.have.property('host');
						res.body.should.have.property('created_at');
						res.body.should.have.property('updated_at');

						done();
					});
			});
		});
	});

	describe('/POST /people', () => {
		it('it should POST people', done => {
			chai.request(app)
				.post('/api/people')
				.send(testPeople)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('name').eql(testPeople.name);
					res.body.should.have.property('last_name').eql(testPeople.last_name);
					res.body.should.have.property('document_id').eql(testPeople.document_id);
					res.body.should.have.property('sign').eql(testPeople.sign);
					res.body.should.have.property('host');
					res.body.should.have.property('created_at');
					res.body.should.have.property('updated_at');

					done();
				});
		});
	});

	describe('/PATCH /people', () => {
		const testPeopleModel = new People(testPeople);
		const newName = 'Popo';

		it('it should UPDATE people', done => {
			testPeopleModel.save((error, people) => {
				chai.request(app)
					.patch('/api/people')
					.send({_id: people._id, name: newName})
					.end((error, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('name').eql(newName);

						done();
					});
			});
		});
	});

	describe('/DELETE /people', () => {
		const testPeopleModel = new People(testPeople);

		it('it should DELETE people', done => {
			testPeopleModel.save((error, people) => {
				const endPoint = '/api/people/id/' + people._id;

				chai.request(app)
					['delete'](endPoint)
					.end((error, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('_id').eql(people._id.toString());
						res.body.should.have.property('message').eql('Entity deleted.');

						done();
					});
			});
		});
	});
});
