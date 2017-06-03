export default (array, key) => {
	const obj = {};

	array.forEach((value) => {
		obj[value[key]] = value;
	});

	return obj;
};
