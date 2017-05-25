export default role => {
    let formatedRol;

    switch (role) {
        case 'super_admin':
            formatedRol = 'super admin';

        case 'admin':
            formatedRol = 'admin';

        default:
            formatedRol = 'viewer';
    }

    return formatedRol;
};
