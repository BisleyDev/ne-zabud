import React from 'react';
import './form.css';

const Gender = () => {
	return (
		<>
			<legend className="modal-form-legend">Стать</legend>
			<div>
				<input type="radio" name="gender" value="male" defaultChecked />
				<span className="modal-form-radio">чоловіча</span>
				<input type="radio" name="gender" />
				<span className="modal-form-radio" value="female">
					жіноча
				</span>
			</div>
		</>
	);
};
export default Gender;
