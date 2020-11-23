import React, { Component } from 'react';

import AppHeader from '../app-header/app-header';
import HeaderInfo from '../header-info/header-info';
import SearchPanel from '../search-panel/search-panel';
import ButtonsGroup from '../buttons-group/buttons-group';
import PostList from '../post-list/post-list';
import PostAddForm from '../post-add-form/post-add-form';
import ModalMenu from '../modal-menu/modal-menu';
import Data from '../../servises/getData';
import Auth from '../../servises/authen';
import Spinner from '../spinner';
import ModalMessage from '../modal-message/modal-message';

// import Warning from '../warning/warning';
import './app.css';

export default class App extends Component {
	state = {
		data: [],
		buttonsFilter: [
			{ name: 'all', label: 'Всі' },
			{ name: 'like', label: 'В магазин!' },
		],
		term: '',
		flag: true,
		filter: 'all',
		modalWindow: false,
		modalWarning: false,
		idToken: false,
		localId: false,
		isLoaded: true,
	};
	componentDidMount() {
		this.checkLogIn();
	}
	componentDidUpdate() {
		this.saveDataAfterChange();
	}

	checkLogIn = () => {
		const signIn = Data.getLocalStorage('signIn');
		if (signIn.length !== 0) {
			const { email, pass } = signIn;
			Auth.signIn(email, pass).then((dataAuth) => this.getToken(dataAuth));
		} else {
			this.setState({ isLoaded: false, modalWarning: true });
		}
	};

	deleteItem = (id) => {
		this.setState(({ data }) => {
			const index = data.findIndex((item) => item.id === id);
			const newArr = [...data.slice(0, index), ...data.slice(index + 1)];

			return { data: newArr };
		});
		// this.saveDataAfterChange();
	};

	addItem = (body) => {
		const newItem = {
			label: body,
			important: false,
			like: true,
			id: Math.floor(Math.random() * 1000),
		};
		if (!this.state.localId) {
			this.setState({ modalWarning: true });
		}

		this.setState(({ data }) => {
			const newArr = [newItem, ...data];
			return { data: newArr };
		});
		// this.saveDataAfterChange();
	};
	onToggleImportant = (id) => {
		this.setState(({ data }) => {
			const index = data.findIndex((item) => item.id === id);
			const old = data[index];
			const newItem = { ...old, important: !old.important };
			const newArr = [
				...data.slice(0, index),
				newItem,
				...data.slice(index + 1),
			];
			return {
				data: newArr,
			};
		});
		// this.saveDataAfterChange();
	};
	onToggleLike = (id) => {
		this.setState(({ data }) => {
			const index = data.findIndex((item) => item.id === id);
			const old = data[index];
			const newItem = { ...old, like: !old.like };
			const newArr = [
				...data.slice(0, index),
				newItem,
				...data.slice(index + 1),
			];
			return {
				data: newArr,
			};
		});
		// this.saveDataAfterChange();
	};
	onUpdateSearch = (term) => {
		this.setState({ term });
	};
	searchPosts = (items, term) => {
		if (term.length === 0) {
			return items;
		}
		const newItems = items.filter((item) => {
			return item.label.indexOf(term) > -1;
		});

		return newItems;
	};

	filterPosts = (data, filter) => {
		if (filter === 'like') {
			return data
				.filter((item) => {
					return item.like;
				})
				.sort((a, b) => (a.important < b.important ? 1 : -1));
		}
		return data;
	};
	onButtonSelect = (filter) => {
		this.setState({ filter });
	};
	isOpenMod = () => {
		this.setState({ modalWindow: !this.state.modalWindow });
	};

	SyncWithServer = (subFolder) => {
		const { data, localId, idToken } = this.state;
		Data.postServer(data, localId, subFolder);
	};

	getToken = ({ idToken, localId }) => {
		Data.getServer(localId, 'listUser', idToken)
			.then((data) => {
				this.setState({ idToken, localId, data });
			})
			.then(() => this.setState({ isLoaded: false }))
			.then(() => this.saveLogin());
	};

	saveLogin = () => {
		const login = Data.getLocalStorage('signIn').login;
		Data.postServer(login, this.state.localId, 'login');
	};

	saveDataAfterChange() {
		console.log(this.state.localId);
		if (this.state.localId) {
			this.SyncWithServer('listUser');
			Data.postLocalStorage(this.state.data);
		}
	}
	renderModalWarning() {
		return (
			<ModalMessage
				title="Будь ласка, увійдіть або створіть новий аккаунт!"
				message="В іншому випадку Ваш список не збережеться."
				isVisible={true}
				onClick={() =>
					this.setState({ modalWarning: false, modalWindow: true })
				}
			/>
		);
	}

	render() {
		if (this.state.isLoaded) {
			return <Spinner />;
		}

		const {
			data,
			term,
			flag,
			filter,
			buttonsFilter,
			modalWindow,
			modalWarning,
		} = this.state;
		const allPosts = data ? data.length : 0;
		const liked = data ? data.filter((elem) => elem.like).length : 0;
		const posts = this.filterPosts(
			this.searchPosts(data, term, flag),
			filter
		);
		const renderModal = modalWindow ? (
			<ModalMenu isOpenMod={this.isOpenMod} getToken={this.getToken} />
		) : null;
		const windowWarning = modalWarning ? this.renderModalWarning() : null;
		return (
			<div className="app">
				<header>
					<AppHeader
						isOpenMod={this.isOpenMod}
						SyncWithServer={this.SyncWithServer}
					/>
					<div className="search-panel d-flex">
						<SearchPanel onUpdateSearch={this.onUpdateSearch} />
						<div>
							<ButtonsGroup
								classSecond="search-button-filter"
								buttonsFilter={buttonsFilter}
								filter={filter}
								onButtonSelect={this.onButtonSelect}
							/>
						</div>
					</div>
					<HeaderInfo liked={liked} allPosts={allPosts} />
				</header>
				<PostList
					posts={posts}
					onDelete={this.deleteItem}
					onToggleImportant={this.onToggleImportant}
					onToggleLiked={this.onToggleLike}
				/>
				<PostAddForm onAdd={this.addItem} />
				{renderModal}
				{windowWarning}
			</div>
		);
	}
}
