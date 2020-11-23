import React from 'react';

const Warning = (props) => {
	const { styleHidden } = props;
	return (
		<div style={styleHidden}>
			<span>По Вашему запросу ничего не найдено</span>
		</div>
	);
};
export default Warning;
