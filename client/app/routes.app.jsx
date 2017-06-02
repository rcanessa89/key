import store from './store.app';
import Api from './services/Api';
import { getUserLoggedAction } from './services/set-current-logged';
import { getCompanySetAction } from './pages/company/action-creators';

// Pages components
import NotFoundPage from './pages/not-found/not-found.component';
import AssetsPage from './pages/assets/assets.component';
import LoginPage from './pages/login/login.component';
import MainPage from './pages/main/main.component';
import PeoplePage from './pages/people/People.component';
import UsersPage from './pages/users/users.component';
import CompanyPage from './pages/company/Company.component';

const api = new Api();

const notFound = {
	name: 'not-found',
	url: '/not-found',
	component: NotFoundPage,
	data: {
		title: 'Nout Found',
	},
};

const login = {
	name: 'login',
	url: '/login',
	component: LoginPage,
	data: {
		title: 'Login',
	},
};

const main = {
	name: 'main',
	abstract: true,
	component: MainPage,
	resolve: {
		data: () => new Promise((resolve, reject) => {
			api.call('get', 'user/logged')
				.then(user => {
					store.dispatch(getUserLoggedAction(user));

					return api.call('get', `company/id/${user.company._id}?populate=users`);
				}, error => reject(error))
				.then(company => {
					store.dispatch(getCompanySetAction(company));
					resolve();
				}, error => reject(error))
				.catch(error => reject(error));
		}),
	}
};

const company = {
	name: 'main.company',
	url: '/company',
	component: CompanyPage,
	data: {
		title: 'Company',
	},
};

const assets = {
	name: 'main.assets',
	url: '/assets',
	component: AssetsPage,
	data: {
		title: 'Assets',
	},
};

const people = {
	name: 'main.people',
	url: '/people',
	component: PeoplePage,
	data: {
		title: 'People',
	},
};

const users = {
	name: 'main.users',
	url: '/users',
	component: UsersPage,
	data: {
		title: 'Users',
	},
};

const states = [
	notFound,
	login,
	main,
	company,
	assets,
	people,
	users,
];

export default states;
