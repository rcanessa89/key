export default (role) => {
	let formatedRol;

	switch (role) {
	case 'super_admin':
		formatedRol = 'super admin';
		break;
	case 'admin':
		formatedRol = 'admin';
		break;
	default:
		formatedRol = 'viewer';
	}

	return formatedRol;
};
