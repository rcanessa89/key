/// <reference path="../../../typings/index.d.ts" />

process.env.ENVIRONMENT = 'test';

import * as mocha from 'mocha';
import * as chai from 'chai';
import app from '../../index';
import Department from '../entities/department/department.model';

const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('Department', () => {
	const testDepartment = {
		name: 'development',
		hosts: []
	};

	beforeEach((done) => {
		Department.remove({}, (err) => {
			done();
		});
	});

	describe('/GET /department', () => {
		it('it should GET all the departments', done => {
			chai.request(app)
				.get('/api/department')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(0);
					done();
				});
		});
	});

	describe('/GET /department/id/:id', () => {
		it('it should GET an department by _id', done => {
			const testDepartmentModel = new Department(testDepartment);

			testDepartmentModel.save((error, department) => {
				const endPoint = '/api/department/id/' + department._id;

				chai.request(app)
					.get(endPoint)
					.end((error, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('_id').eql(department._id.toString());
						res.body.should.have.property('name').eql(testDepartment.name);
						res.body.should.have.property('hosts').be.a('array').length.be(0);
						res.body.should.have.property('created_at');
						res.body.should.have.property('updated_at');

						done();
					});
			});
		});
	});

	describe('/POST /department', () => {
		it('it should POST an department', done => {
			chai.request(app)
				.post('/api/department')
				.send(testDepartment)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('name').eql(testDepartment.name);
					res.body.should.have.property('hosts').be.a('array').length.be(0);
					res.body.should.have.property('created_at');
					res.body.should.have.property('updated_at');

					done();
				});
		});
	});

	describe('/PATCH /department', () => {
		const testDepartmentModel = new Department(testDepartment);
		const newName = 'Design';

		it('it should UPDATE an department', done => {
			testDepartmentModel.save((error, department) => {
				chai.request(app)
					.patch('/api/department')
					.send({_id: department._id, name: newName})
					.end((error, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('name').eql(newName);
						res.body.should.have.property('hosts').be.a('array');

						done();
					});
			});
		});
	});

	describe('/DELETE /department', () => {
		const testDepartmentModel = new Department(testDepartment);

		it('it should DELETE an department', done => {
			testDepartmentModel.save((error, department) => {
				const endPoint = '/api/department/id/' + department._id;

				chai.request(app)
					['delete'](endPoint)
					.end((error, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.should.have.property('_id').eql(department._id.toString());
						res.body.should.have.property('message').eql('Entity deleted.');

						done();
					});
			});
		});
	});
});
