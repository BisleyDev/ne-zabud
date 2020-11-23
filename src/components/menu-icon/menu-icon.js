import React, { useState } from 'react';
import './menu-icon.css';

function MenuIcon({ defaultState, isOpenMod }) {
	// const [classChange, toggleClass] = useState(defaultState);

	function onClick() {
		// if (classChange === 'change') {
		// 	toggleClass('');
		// } else {
		// 	toggleClass('change');
		// }
		isOpenMod();
	}

	return (
		<div className="row">
			<div className={`container ${defaultState}`} onClick={onClick}>
				<div className="bar1"></div>
				<div className="bar2"></div>
				<div className="bar3"></div>
			</div>
		</div>
	);
}

export default MenuIcon;
