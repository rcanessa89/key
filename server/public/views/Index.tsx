import * as React from 'react';
import HeaderNav from './components/HeaderNav';
import Footer from './components/Footer';

interface IndexDocumentProps {
	title?: string,
	children?: any,
	script?: string,
};

class IndexDocument extends React.Component<IndexDocumentProps, undefined> {
	render() {
		return (
			<html>
				<head>
					<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
					<meta name="google-signin-client_id" content="191151473168-bk71j5i4ehm32o14d0b9i21rtbb59juh.apps.googleusercontent.com" />
					<title>Key - {this.props.title}</title>
					<link rel="stylesheet" href="assets/css/main.css" />
					<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.4.0/css/bulma.min.css" />
					<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
				</head>
				<body>
					<HeaderNav />
					{this.props.children}
					<div className="g-signin2" data-onsuccess="onSignIn" />
					<Footer />
					<script src="https://apis.google.com/js/platform.js" async defer />
					<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
					<script src={`assets/js/${this.props.script}.js`} />
				</body>
			</html>
		);
	}
}

export default IndexDocument;