import React from 'react';
import Form from '../form/form';
import './modal-menu.css';

function ModalMenu({ isOpenMod, getToken }) {
	return (
		<section className="container-modal">
			<div></div>
			<aside>
				<Form isOpenMod={isOpenMod} getToken={getToken} />
			</aside>
		</section>
	);
}
export default ModalMenu;
