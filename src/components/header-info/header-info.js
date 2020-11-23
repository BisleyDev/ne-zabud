import React from 'react';
import './header-info.css';

const HeaderInfo = ({ liked, allPosts }) => {
	return (
		<div className="header-info">
			<p>
				Всього записів: <b>{allPosts}</b>
			</p>
			<p>
				Необхідно придбати: <b>{liked}</b>
			</p>
		</div>
	);
};
export default HeaderInfo;
