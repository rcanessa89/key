import notFoundPage from './pages/not-found/not-found.component';
import assetsPage from './pages/assets/assets.component';
import departmentsPage from './pages/departments/departments.component';
import hostsPage from './pages/hosts/hosts.component';
import loginPage from './pages/login/login.component';
import mainPage from './pages/main/main.component';
import registriesPage from './pages/registries/registries.component';
import usersPage from './pages/users/users.component';

const notFound = {
	name: 'not-found',
	url: '/not-found',
	component: notFoundPage
};

const login = {
	name: 'login',
	url: '/login',
	component: loginPage
};

const main = {
	name: 'main',
	url: '/',
	component: mainPage
};

const assets = {
	name: 'main.assets',
	url: '/assets',
	component: assetsPage
};

const departments = {
	name: 'main.departments',
	url: '/departments',
	component: departmentsPage
};

const hosts = {
	name: 'main.hosts',
	url: '/hosts',
	component: hostsPage
};

const registries = {
	name: 'main.registries',
	url: '/registries',
	component: registriesPage
};

const users = {
	name: 'main.users',
	url: '/users',
	component: usersPage
};

const states = [
	notFound,
	login,
	main,
	assets,
	departments,
	hosts,
	registries,
	users
];

export default states;

