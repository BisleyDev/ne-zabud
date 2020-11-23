import React from 'react';
import './modal-message.css';

function ModalMessage({ title, message, onClick }) {
	return (
		<div className="message-wrap" onClick={onClick}>
			<section>
				<h4>{title}</h4>
				<p>{message}</p>
			</section>
		</div>
	);
}

export default ModalMessage;
