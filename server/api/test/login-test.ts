import * as mocha from 'mocha';
import * as chai from 'chai';
import Company from '../entities/company/company.model';
import User from '../entities/user/user.model';
import constants from '../../constants';

export default app => {
	const agent = chai.request.agent(app);

	return new Promise((resolve, reject) => {
		Company.remove({}, error => {
			User.remove({}, error => {
				new Company({
					_id: "592456b664efa42357ef5f3b",
					updated_at: "2017-05-23T15:35:18.191Z",
					created_at: "2017-05-23T15:35:18.191Z",
					name: "google",
					assets: [],
					registries: [],
					users: [],
					departments: []
				}).save((error, company) => {
					const emailTest: string = 'rcanessa89@hotmail.com';
					const passwordTest: string = 'EDhunter89';

					new User({
						_id: '592456b664efa42357ef5f3c',
						updated_at: '2017-05-23T15:36:08.471Z',
						created_at: '2017-05-23T15:35:18.203Z',
						name: 'Rodolfo',
						last_name: 'Canessa',
						email: emailTest,
						company: '592456b664efa42357ef5f3b',
						verified: true,
						photo: null,
						rol: 'super_admin',
						password: '$2a$10$obW2A0lOVZBoKdBG5FlIp.GF8.6E0eQRmAm3oxpLjfs6BLT4eD9hu'
					})
					.save((error, testUser) => {
						console.log(testUser);
						
						agent
							.post('api/login')
							.send({ email: emailTest, password: passwordTest })
							.then(res => {
								res.body.should.have.cookie(constants.SESSION_COOKIE_NAME);
								resolve(agent);
							}, error => reject(error))
							.catch(error => reject(error));
					});
				});
			});
		});
	});
}