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
};

const login = {
	name: 'login',
	url: '/login',
	component: LoginPage,
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
};

const assets = {
	name: 'main.assets',
	url: '/assets',
	component: AssetsPage,
};

const departments = {
	name: 'main.departments',
	url: '/departments',
	component: DepartmentsPage,
};

const hosts = {
	name: 'main.hosts',
	url: '/hosts',
	component: HostsPage,
};

const people = {
	name: 'main.people',
	url: '/people',
	component: PeoplePage,
};

const users = {
	name: 'main.users',
	url: '/users',
	component: UsersPage,
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
