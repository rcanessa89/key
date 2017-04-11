const onMobileNavChange = (state) => {
	const htmlTag = document.querySelector('html');

	if (state) {
		htmlTag.classList.add('off-scroll');
	} else {
		htmlTag.classList.remove('off-scroll');
	}
};

export default (state) => {
	onMobileNavChange(state.mobileNav);
};
