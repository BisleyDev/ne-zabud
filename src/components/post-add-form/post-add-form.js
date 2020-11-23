import React, { Component } from 'react';
import { isValid } from '../../servises/utils.js';
import './post-add-form.css';

export default class PostAddForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			disabledBtn: true,
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	onChange(event) {
		const text = event.target.value;
		this.setState({ disabledBtn: !isValid(text, 3) });

		this.setState({ text });
	}
	onSubmit(event) {
		event.preventDefault();
		this.props.onAdd(this.state.text);
		this.setState({ text: '', disabledBtn: true });
	}

	render() {
		const styleHidden = this.props.styleHidden;
		return (
			<form
				className="bottom-panel d-flex"
				onSubmit={this.onSubmit}
				style={styleHidden}
			>
				<input
					type="text"
					placeholder="Додати новий елемент"
					className="form-control new-post=label"
					onChange={this.onChange}
					value={this.state.text}
				/>
				<button
					type="submit"
					className="btn btn-outline-secondary"
					disabled={this.state.disabledBtn}
				>
					Додати
				</button>
			</form>
		);
	}
}
