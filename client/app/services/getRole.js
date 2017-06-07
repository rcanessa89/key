import constants from '../constants.app';

export default (role) => {
	let formatedRol;

	switch (role) {
	case 'super_admin':
		formatedRol = constants.rols.super_admin;
		break;
	case 'admin':
		formatedRol = constants.rols.admin;
		break;
	default:
		formatedRol = constants.rols.viewer;
	}

	return formatedRol;
};
