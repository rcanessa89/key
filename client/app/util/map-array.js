const objToArr = (obj) => {
	const arr = [];

	Object.key(obj).forEach((key) => {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			arr.push(obj[key]);
		}
	});

	return arr;
};

export {
	objToArr,
};

export default (array, key) => {
	const obj = {};

	array.forEach((value) => {
		obj[value[key]] = value;
	});

	return obj;
};
