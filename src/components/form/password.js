import React from 'react';
import './form.css';

const Password = ({ legend, name, onChangeValue, writeEmail }) => {
	return (
		<>
			<legend className="modal-form-legend">{legend}</legend>
			<input
				className="modal-form-input"
				name={name}
				type="password"
				placeholder="не менше 6 символів"
				onChange={(event) => onChangeValue(event.target.value)}
			/>
		</>
	);
};
export default Password;
