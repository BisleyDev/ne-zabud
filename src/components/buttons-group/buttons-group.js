import React from 'react';
import './buttons-group.css';

function ButtonsGroup({ buttonsFilter, filter, onButtonSelect, classSecond }) {
	const buttons = buttonsFilter.map(({ name, label }) => {
		const active = filter === name;
		const classNam = active ? 'btn-info' : 'tn-outline-secondary';
		return (
			<button
				key={name}
				type="button"
				className={`btn ${classSecond} ${classNam}`}
				onClick={() => onButtonSelect(name)}
			>
				{label}
			</button>
		);
	});

	return <>{buttons}</>;
}
export default ButtonsGroup;
