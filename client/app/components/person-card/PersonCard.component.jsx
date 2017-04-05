import React from 'react';
import classnames from 'classnames';

const propTypes = {
	photo: React.PropTypes.string.isRequired,
	name: React.PropTypes.string.isRequired,
	lastName: React.PropTypes.string.isRequired,
	label: React.PropTypes.string,
	footerItems: React.PropTypes.arrayOf(React.PropTypes.shape({
		label: React.PropTypes.string.isRequired,
		action: React.PropTypes.func.isRequired,
	})),
	columns: React.PropTypes.string,
	columnsTable: React.PropTypes.string,
	columnsMobile: React.PropTypes.string,
};

const defaultProps = {
	label: null,
	footerItems: [],
	columns: '4',
	columnsTable: '6',
	columnsMobile: '12',
};

const getFooterItems = items => {
	let footerItems = null;

	if (items.length) {
		footerItems = items.map((item, index) => {
			const key = `key-${index}`;
			return <a key={key} className="card-footer-item" onClick={item.action}>{item.label}</a>
		});
	}

	return <footer className="card-footer">{footerItems}</footer>;
};

const PersonCard = props => {
	const footerItems = getFooterItems(props.footerItems);
	const content = props.content ? (<div className="content">{props.content}</div>) : null;
	const columnClassName = classnames({
		column: true,
		[`is-${props.columns}-desktop`]: true,
		[`is-${props.columnsTable}-tablet`]: true,
		[`is-${props.columnsMobile}-mobile`]: true,
	});

	return (
		<div className={columnClassName}>
			<div className="card">
				<div className="card-image">
					<figure className="image is-4by3">
						<img src={props.photo} alt="Person card" />
					</figure>
				</div>
				<div className="card-content">
					<div className="media">
						<div className="media-content">
							<p className="title is-4">{`${props.name} ${props.lastName}`}</p>
							<p className="subtitle is-6">{props.label}</p>
						</div>
					</div>
					{content}
				</div>
				{footerItems}
			</div>
		</div>
	);
};

PersonCard.propTypes = propTypes;
PersonCard.defaultProps = defaultProps;

export default PersonCard;
