import NotFoundPage from './pages/not-found/not-found.component';
import AssetsPage from './pages/assets/assets.component';
import DepartmentsPage from './pages/departments/departments.component';
import HostsPage from './pages/hosts/hosts.component';
import LoginPage from './pages/login/login.component';
import MainPage from './pages/main/main.component';
import PeoplePage from './pages/people/People.component';
import UsersPage from './pages/users/users.component';
import CompanyPage from './pages/company/Company.component';

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

const departments = {
	name: 'main.departments',
	url: '/departments',
	component: DepartmentsPage,
	data: {
		title: 'Departments',
	},
};

const hosts = {
	name: 'main.hosts',
	url: '/hosts',
	component: HostsPage,
	data: {
		title: 'Hosts',
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
	departments,
	hosts,
	people,
	users,
];

export default states;
