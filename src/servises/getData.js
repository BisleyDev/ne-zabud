export default class Data {
	static postServer(data, localId, subFolder) {
		const url = `https://ne-zabud.firebaseio.com/lists/${localId}.json`;
		// const methodSend =
		// 	Data.getServer(idToken, localId).lendth !== 0 ? 'POST' : 'PUT';

		const body = {
			[subFolder]: data,
		};
		console.log('Data -> postServer -> body', body);
		return fetch(url, {
			method: 'PUT',
			body: JSON.stringify(body),
			header: {
				'Content-Type': 'application/json',
			},
		}).then((resp) => resp.json());
	}
	// static changeDataServer(data) {
	// 	fetch('https://ne-zabud.firebaseio.com/lists.json', {
	// 		method: 'PUT',
	// 		body: JSON.stringify(data),
	// 		header: {
	// 			'Content-Type': 'application/json',
	// 		},
	// });
	// }
	static getServer(localId, subFolder) {
		const url = `https://ne-zabud.firebaseio.com/lists/${localId}/${subFolder}.json?aunt=${subFolder}`;
		return fetch(url)
			.then((resp) => resp.json())
			.then((resp) => resp || []);
	}
	static postLocalStorage(data, key = 'items') {
		localStorage.setItem(key, JSON.stringify(data));
	}
	static getLocalStorage(key) {
		return getDataFromLocalStorage(key);
	}
}

function getDataFromLocalStorage(key) {
	return JSON.parse(localStorage.getItem(key) || '[]');
}
