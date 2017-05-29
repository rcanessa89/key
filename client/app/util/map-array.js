export default (array, key) => {
	const obj = {};

	array.forEach((value, index) => {
		obj[value[key]] = value;
	});

	return obj;
}