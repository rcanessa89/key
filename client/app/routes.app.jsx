import store from './store.app';
import Api from './services/Api';

// Serives
import peopleService from './pages/people/people.service';

// Redux actions
import { getUserLoggedAction } from './services/set-current-logged';
import { getCompanySetAction } from './pages/company/action-creators';
import { setUsers } from './pages/users/action-creators';
import { setRegistries } from './pages/people/action-creators';

// Pages components
import NotFoundPage from './pages/not-found/not-found.component';
import AssetsPage from './pages/assets/AssetsPage.component';
import MainPage from './pages/main/main.component';
import PeoplePage from './pages/people/PeoplePage.component';
import CompanyPage from './pages/company/CompanyPage.component';
import UsersPage from './pages/users/UsersPage.component';

const api = new Api();

const notFound = {
	name: 'not-found',
	url: '/not-found',
	component: NotFoundPage,
	data: {
		title: 'Nout Found',
	},
};

const main = {
	name: 'main',
	abstract: true,
	component: MainPage,
	resolve: {
		company: () => new Promise((resolve, reject) => {
			api.call('get', 'user/logged')
				.then((user) => {
					store.dispatch(getUserLoggedAction(user));

					const select = 'select=-created_at,-__v,-updated_at';
					const populate = 'populate=users';
					const populateSelect = 'populateSelect=-created_at,-updated_at,-verified,-__v';
					const url = `company/id/${user.company._id}?${select}&${populate}&${populateSelect}`;

					return api.call('get', url);
				}, error => reject(error))
				.then((company) => {
					const companyPageData = {
						_id: company._id,
						name: company.name,
						departments: company.departments,
					};

					store.dispatch(getCompanySetAction(companyPageData));
					store.dispatch(setUsers(company.users));

					resolve(companyPageData);
				}, error => reject(error))
				.catch(error => reject(error));
		}),
	},
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
	resolve: {
		registries: () => new Promise((resolve, reject) => {
			peopleService.getRegistries()
				.then((registries) => {
					store.dispatch(setRegistries(registries));
					resolve(registries);
				}, error => reject(error))
				.catch(error => reject(error));
		}),
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

export {
	notFound,
	main,
	company,
	assets,
	people,
	users,
};

export default [
	notFound,
	main,
	company,
	assets,
	people,
	users,
];
