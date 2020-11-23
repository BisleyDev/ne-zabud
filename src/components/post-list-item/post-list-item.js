import React, { Component } from 'react';
import './post-list-item.css';

export default class PostListItem extends Component {
	render() {
		const {
			label,
			onDelete,
			onToggleImportant,
			onToggleLiked,
			important,
			like,
		} = this.props;

		let classNames = 'app-list-item d-flex justify-content-between';
		if (important) {
			classNames += ' important';
		}
		if (like) {
			classNames += ' like';
		}

		return (
			<div className={classNames}>
				<div onClick={onToggleLiked} className="app-list-item-label">
					{label}
				</div>
				<div className="d-flex justify-content-center align-item-center">
					<button
						type="button"
						className="btn-star btn-sm"
						onClick={onToggleImportant}
					>
						<i className="fa fa-star"></i>
					</button>
					<button
						type="button"
						className="btn-trash btn-sm"
						onClick={onDelete}
					>
						<i className="fa fa-trash-o"></i>
					</button>
					<i className="fa fa-shopping-cart"></i>
				</div>
			</div>
		);
	}
}
