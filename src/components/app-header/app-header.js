import React from 'react';
import logo from './logo.svg';
import './app-header.css';
import MenuIcon from '../menu-icon/menu-icon';

const AppHeader = ({ isOpenMod, SyncWithServer }) => {
	return (
		<div className="app-header">
			<img src={logo} alt="logo" onClick={SyncWithServer} />

			<MenuIcon isOpenMod={isOpenMod} defaultState="" />
		</div>
	);
};
export default AppHeader;
