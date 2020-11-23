import React, { useState, useEffect } from 'react';
import Login from './login';
import Email from './Email';
import Password from './password';
import Gender from './gender';
import ButtonsGroup from '../buttons-group/buttons-group';
import MenuIcon from '../menu-icon/menu-icon';
import Auth from '../../servises/authen';
import Data from '../../servises/getData';
import './form.css';

function Form({ isOpenMod, getToken }) {
	const loginDefault = Data.getLocalStorage('signIn').login || 'Користувач';

	const [buttonSelect, toggleSelect] = useState('SingUp');
	const [createPass, toggleCreatePass] = useState('');
	const [confirmPass, toggleConfirmPass] = useState('');
	const [email, saveEmail] = useState('');
	const [login, saveLogin] = useState(loginDefault);
	const [disabledSubmit, toggledisabledSubmit] = useState(true);

	const onButtonSelect = (name) => {
		toggleSelect(name);
	};

	const buttons = [
		{ name: 'LogIn', label: 'Увійти' },
		{ name: 'SingUp', label: 'Реєстрація' },
	];

	useEffect(() => {
		renderItems();
		if (
			(buttonSelect === 'LogIn' && confirmPass.length > 5) ||
			(buttonSelect === 'SingUp' &&
				createPass.length > 5 &&
				createPass === confirmPass)
		) {
			toggledisabledSubmit(false);
		} else {
			toggledisabledSubmit(true);
		}
	});

	function getSubmitForm(event) {
		event.preventDefault();
		const auth =
			buttonSelect === 'SingUp'
				? Auth.signUp(email, confirmPass)
				: Auth.signIn(email, confirmPass);
		auth.then((token) => getToken(token));
		auth.then(() => {
			Data.postLocalStorage({ email, pass: confirmPass, login }, 'signIn');
		});
	}

	function renderItems(params) {
		if (buttonSelect === 'SingUp') {
			return (
				<>
					<Login onChangeValue={(e) => saveLogin(e)} />
					<Email onChangeValue={(e) => saveEmail(e)} />
					<Password
						legend="Cтворіть пароль"
						name="createPass"
						onChangeValue={(e) => toggleCreatePass(e)}
					/>
					<Password
						legend="Підтвердіть пароль"
						name="confirmPass"
						onChangeValue={(e) => toggleConfirmPass(e)}
					/>
					<Gender />
				</>
			);
		} else if (buttonSelect === 'LogIn') {
			return (
				<div>
					<Email onChangeValue={(e) => saveEmail(e)} />
					<Password
						legend="Пароль"
						name="confirmPass"
						onChangeValue={(e) => toggleConfirmPass(e)}
					/>
				</div>
			);
		} else if (buttonSelect === 'out') {
			localStorage.clear();
			isOpenMod();
		}
	}
	const modalHeaderBtn =
		Data.getLocalStorage('signIn').length === 0
			? buttons
			: [{ name: 'out', label: 'Вийти' }];

	const modalBody =
		Data.getLocalStorage('signIn').length === 0 ? (
			<form active="#" className="modal-form">
				{renderItems()}

				<input
					className="btn modal-form-button"
					type="submit"
					value="Відправити"
					onClick={getSubmitForm}
					disabled={disabledSubmit}
				/>
			</form>
		) : (
			<div>
				<h4>Привіт, {login}</h4>
				<p>
					Дякую, що користуєшся нотатком "Не забудь!".
					<br /> Додаток ще 'сирий', але я плідно над ним працюю.
					<br /> Маєш зауваження чи пропозиції, будь ласка звертайся <br />
					<a href="https://t.me/ne_zabud_shopping_list" target="_blank">
						{' '}
						Група в Telegram
					</a>
				</p>
			</div>
		);

	return (
		<>
			<div className="modal-buttons-group">
				<ButtonsGroup
					classSecond="modal-button-auten"
					buttonsFilter={modalHeaderBtn}
					onButtonSelect={onButtonSelect}
					filter={buttonSelect}
				/>
				<MenuIcon defaultState="change" isOpenMod={isOpenMod} />
			</div>
			{modalBody}
		</>
	);
}
export default Form;
