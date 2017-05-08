import * as React from 'react';
import Index from './index';

interface HomeProps {
	logged?: any,
};

export default class Home extends React.Component<HomeProps, undefined> {
	render() {
		return (
			<Index
				title="Home"
				script="home"
				wrapperClass="home-page"
				logged={this.props.logged}
			>
				<section className="hero is-medium is-primary is-bold">
					<div className="hero-body">
						<div className="container">
							<h1 className="title">Key App</h1>
							<h2 className="subtitle">Lorem Ipsum is simply dummy text of the printing and typesetting industry</h2>
						</div>
					</div>
				</section>

				<section className="section">
					<div className="container">
						<div className="heading">
							<h1 className="title">Section</h1>
							<h2 className="subtitle">A simple container to divide your page into <strong>sections</strong>, like the one you're currently reading</h2>
						</div>
						<hr />
						<div className="content">
							<h1>Hello World</h1>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.</p>
							<ul>
								<li>In fermentum leo eu lectus mollis, quis dictum mi aliquet.</li>
								<li>Morbi eu nulla lobortis, lobortis est in, fringilla felis.</li>
								<li>Aliquam nec felis in sapien venenatis viverra fermentum nec lectus.</li>
								<li>Ut non enim metus.</li>
							</ul>
						</div>
					</div>
				</section>

			</Index>
		);
	}
}
