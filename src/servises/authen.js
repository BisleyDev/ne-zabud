export default class Auth {
	static signUp(email, password) {
		const BASE_URL =
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
		return getServer(BASE_URL, email, password);
	}

	static signIn(email, password) {
		const BASE_URL =
			'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
		return getServer(BASE_URL, email, password);
	}
}

function getServer(url, email, password) {
	const API_KEY = `AIzaSyAoLAbWvAgAc1VG_z1x50ABZXocX9rul9s`;
	return fetch(`${url}${API_KEY}`, {
		method: 'POST',
		body: JSON.stringify({
			email,
			password,
			returnSecureToken: true,
		}),
		header: {
			'Content-Type': 'application/json',
		},
	}).then((resp) => resp.json());
}
