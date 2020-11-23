import React from 'react';
import './form.css';

const Email = ({ onChangeValue }) => {
	return (
		<>
			<legend className="modal-form-legend">Email</legend>
			<input
				className="modal-form-input"
				name="email"
				type="email"
				placeholder="alex@gmail.com"
				onChange={(event) => onChangeValue(event.target.value)}
			/>
		</>
	);
};
export default Email;
