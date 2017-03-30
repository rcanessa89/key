const regex = {
	letters: /[a-zA-ZÑÁÉÍÓÚáéíóú][a-zA-Zñáéíóú ]{1,}/,
	email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}

export default class TextValidator {
	constructor(options) {
		if (options.pattern) {
			this.regex = options.pattern;
		}
		
		if (regex[options.type] !== undefined) {
			this.regex = regex[options.type];
		} else {
			this.regex = regex.letters;
		}
	}

	test(value) {
		return this.regex.test(value);
	}
}