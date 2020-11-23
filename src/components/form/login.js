import React from 'react';
import './form.css';

const Login = ({ onChangeValue }) => {
	return (
		<>
			<legend className="modal-form-legend">Ваш логін</legend>
			<input
				className="modal-form-input"
				name="login"
				type="text"
				placeholder="введіть логін"
				onChange={(event) => {
					console.log('Login -> event', event.target.value);

					onChangeValue(event.target.value);
				}}
			/>
		</>
	);
};
export default Login;
