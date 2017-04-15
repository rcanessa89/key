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
					<title>Key - {this.props.title}</title>
					<link rel="stylesheet" href="assets/css/main.css" />
					<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.4.0/css/bulma.min.css" />
					<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
				</head>
				<body>
					<HeaderNav />
					{this.props.children}
					<Footer />
					<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
					<script src={`assets/js/${this.props.script}.js`} />
				</body>
			</html>
		);
	}
}

export default IndexDocument;