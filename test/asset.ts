/// <reference path="../typings/index.d.ts" />

process.env.ENVIRONMENT = 'test';

import * as mocha from 'mocha';
import * as chai from 'chai';
import app from '../server/index';
import Asset from '../server/api/entities/asset/asset.model';

const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('Asset', ()=> {
	const testAsset = {
		asset_type: 'computer',
		asset_model: 'x23-x',
		owner: '58d89d1bf64ea1c2bc737596',
		brand: 'Assus'
	};

	beforeEach((done) => {
        Asset.remove({}, (err) => { 
           done();         
        });     
    });

	describe('/GET /asset', () => {
		it('it should GET all the assets', done => {
			chai.request(app)
				.get('/api/asset')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(0);
					
					done();
				});
		  });
	  });

	describe('/GET /asset/:id', () => {
		it('it should GET an asset by _id', done => {
			const testAssetModel = new Asset(testAsset);

			testAssetModel.save((error, asset) => {
				const endPoint = '/api/asset/' + asset._id;

				chai.request(app)
					.get(endPoint)
					.end((error, res) => {
						res.should.have.status(200);
                		res.body.should.be.a('object');
                		res.body.should.have.property('_id').eql(asset._id.toString());
                		res.body.should.have.property('asset_type').eql(testAsset.asset_type);
                		res.body.should.have.property('brand').eql(testAsset.brand);
                		res.body.should.have.property('owner');
                		res.body.should.have.property('created_at');
                		res.body.should.have.property('updated_at');

						done();
					});
			});
		});
	});

	describe('/POST /asset', () => {
		it('it should POST an asset', done => {
			chai.request(app)
				.post('/api/asset')
	            .send(testAsset)
	            .end((err, res) => {
	                res.should.have.status(200);
            		res.body.should.be.a('object');
            		res.body.should.have.property('asset_type').eql(testAsset.asset_type);
                	res.body.should.have.property('brand').eql(testAsset.brand);
                	res.body.should.have.property('owner');
            		res.body.should.have.property('created_at');
            		res.body.should.have.property('updated_at');

	              	done();
	            });
		});
	});

	describe('/PATCH /asset', () => {
		const testAssetModel = new Asset(testAsset);
		const newModel = 'y23-y';
		const newBrand = 'DELL';

		it('it should UPDATE an asset', done => {
			testAssetModel.save((error, asset) => {
				chai.request(app)
					.patch('/api/asset')
					.send({_id: asset._id, asset_model: newModel, brand: newBrand})
					.end((error, res) => {
						res.should.have.status(200);
	                	res.body.should.be.a('object');
	                	res.body.should.have.property('asset_model').eql(newModel);
	                	res.body.should.have.property('brand').eql(newBrand);

                		done();
					});
			});
		});
	});

	describe('/DELETE /asset', () => {
		const testAssetModel = new Asset(testAsset);

		it('it should DELETE an asset', done => {
			testAssetModel.save((error, asset) => {
				const endPoint = '/api/asset/' + asset._id;

				chai.request(app)
					['delete'](endPoint)
					.end((error, res) => {
						res.should.have.status(200);
	                	res.body.should.be.a('object');
	                	res.body.should.have.property('_id').eql(asset._id.toString());
	                	res.body.should.have.property('message').eql('Entity deleted.');

	                	done();
					})
			});
		});
	});
});