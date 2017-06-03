export default (array, key) => array.sort((a, b) => {
	const textA = key ? a[key].toUpperCase() : a.toUpperCase();
	const textB = key ? b[key].toUpperCase() : b.toUpperCase();

	if (textA < textB) {
		return -1;
	} else if (textA > textB) {
		return 1;
	}

	return 0;
});
