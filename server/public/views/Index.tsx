import * as React from 'react';
import HeaderNav from './components/HeaderNav';
import Footer from './components/Footer';

interface IndexDocumentProps {
	title?: string,
	children?: any,
	script?: string,
	wrapperClass?: string,
	logged?: any,
};

class IndexDocument extends React.Component<IndexDocumentProps, undefined> {
	render() {
		const userBodyClassName = this.props.logged ? 'user-logged' : '';

		return (
			<html>
				<head>
					<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
					<title>Key - {this.props.title}</title>
					<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.4.0/css/bulma.min.css" />
					<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
					<link rel="stylesheet" href="assets/css/main.css" />
					<script src='https://www.google.com/recaptcha/api.js'></script>
				</head>
				<body className={`${this.props.wrapperClass} ${userBodyClassName}`}>
					<HeaderNav
						logged={this.props.logged}
					/>
					<main>{this.props.children}</main>
					<Footer />
					<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" />
					<script src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/jquery.validate.js" />
					<script src="assets/js/app.js" />
					<script src={`assets/js/${this.props.script}.js`} />
				</body>
			</html>
		);
	}
}

export default IndexDocument;