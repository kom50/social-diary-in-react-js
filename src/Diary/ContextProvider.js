import React, { useState } from 'react';
import axios from './Axios/Axios';
import Toast from './Component/Toast.js';

export const myContext = React.createContext();

const ContextStore = (props) => {
	// ANCHOR current user
	const [user, setUser] = useState({ username: '', password: '', notes: [] });
	const [isLoggedIn, setLogin] = useState(false);
	const [isLoaded, setLoaded] = useState(false);
	const [allNotes, setAllNotes] = React.useState([]);
	const [users, setUsers] = React.useState([]);
	//
	let side_bar = null;
	//  new notes properties
	const [newNotes, setNewNotes] = React.useState({
		author: user.username,
		title: '',
		content: '',
		timestamp: new Date().toLocaleString(),
		// id: '',
	});
	// new user properties
	const [newUser, setNewUser] = React.useState({
		username: '',
		name: '',
		email: '',
		password: '',
		re_password: '',
	});

	//ANCHOR
	const postHandler = (event, data) => {
		event.preventDefault();
		console.log('handle push data');
		let isCreateUser = data.isCreateUser;
		// data properties
		delete data.isCreateUser;
		setLoaded(false);
		axios
			.post(
				isCreateUser ? `/users.json` : `/allNotes/${user.username}/notes.json`,
				data
			)
			.then((res) => {
				console.log(res);
				if (isCreateUser) {
					setUsers([...users, { ...data, id: res.data.name }]);
					console.log('Account successfully created');
					Toast.makeToast('Account successfully created', Toast.LONG);
					// set initial value
					setNewUser({
						username: '',
						name: '',
						email: '',
						password: '',
						re_password: '',
					});
				} else {
					setUser({
						...user,
						notes: [...user.notes, { ...data, id: res.data.name }],
					});
					console.log('Story successfully created...', user.username);
					Toast.makeToast('Story successfully created...', Toast.LONG);

					setNewNotes({
						author: user.username,
						title: '',
						content: '',
						timestamp: new Date().toLocaleString(),
					});
				}
			})
			.catch((err) => {
				console.log(err);
			})
			.then(() => {
				setLoaded(true);
			});
	};
	// TODO: gets User all notes(story)
	const getUserNotes = async () => {
		console.log('user.username', user.username);
		try {
			setLoaded(false);
			const res = await axios.get(`/allNotes/${user.username}/notes.json`);
			const data = [];
			for (let key in res.data) {
				data.push({ ...res.data[key], id: key });
			}
			setUser({ ...user, notes: [...data] });
			console.log('user all notes ', data);
		} catch (err) {
			console.log(err);
		} finally {
			setLoaded(true);
		}
	};
	// get All users
	const getUsers = async () => {
		try {
			setLoaded(false);
			const res = await axios.get('/users.json');
			const data = [];
			for (let key in res.data) {
				data.push({
					username: res.data[key].username,
					password: res.data[key].password,
					id: key,
				});
			}
			setUsers([...data]);
			console.log('all users ', data);
			// users
			getAllNotes(data);
		} catch (err) {
			console.log(err);
		} finally {
			setLoaded(true);
		}
	};
	// get all users notes
	const getAllNotes = async (users) => {
		try {
			setLoaded(false);

			const res = await axios.get('/allNotes.json');
			console.log('all Notes res ', res);
			let notes;
			let temp_username = [];
			for (let key in res.data) {
				temp_username.push(key); // user name
			}
			const data = [];
			// for (let i = 0; i < Object.keys(res.data).length; i++) {
			for (let u_name in res.data) {
				// let temp_user = console.log(res.data[users[i]['username']]['notes']);
				notes = res.data[u_name]['notes'];
				if (!!notes) {
					for (let key in notes) {
						data.push({ ...notes[key], id: key });
					}
				}
				console.log(data);
			}
			setAllNotes([...data]);
		} catch (err) {
			console.error(err);
		} finally {
			setLoaded(true);
		}
	};

	// TODO: delete notes
	const deleteHandler = async (event, id) => {
		event.preventDefault();
		setLoaded(false);
		try {
			const res = await axios.delete(
				`allNotes/${user.username}/notes/${id}.json`
			);

			console.log('Data deleted successfully', res);
			Toast.makeToast('Story Deleted', Toast.LONG);
			// delete from user.notes
			setUser({
				...user,
				notes: [...user.notes.filter((temp_user) => temp_user.id !== id)],
			});
		} catch (err) {
			console.log('err ', err);
		} finally {
			setLoaded(true);
		}
	};

	//ANCHOR Update notes
	const editHandler = (event, id) => {
		event.preventDefault();
		console.log('edit button');
		delete newNotes.id;
		update(id);
		event.stopPropagation();
	};
	// 🔥 🔥 🔥
	const update = async (id) => {
		let data = user.notes;
		setLoaded(false);
		try {
			await axios.put(`allNotes/${user.username}/notes/${id}.json`, {
				...newNotes,
			});
			data[data.findIndex((da) => da.id === id)] = newNotes;
			setUser({ ...user, notes: [...data] });
			Toast.makeToast('Story Updated', Toast.LONG);

			setNewNotes({
				author: user.username,
				title: '',
				content: '',
				timestamp: new Date().toLocaleString(),
			});
		} catch (err) {
			console.error(err);
		} finally {
			setLoaded(true);
		}
	};

	React.useEffect(() => {
		if (window.localStorage.getItem('username')) {
			setUser({
				...user,
				username: window.localStorage.getItem('username'),
				password: window.localStorage.getItem('password'),
			});
			setLogin(true);
		}
		getUsers();
		if (isLoggedIn) {
			getUserNotes();
		}
	}, [isLoggedIn]);

	return (
		<myContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				setLogin: setLogin,

				// For progress
				isLoaded: isLoaded,
				setLoaded: setLoaded,

				// For current user
				user: user,
				setUser: setUser,

				// All users notes
				allNotes: allNotes,
				users: users,

				postHandler: postHandler,
				// For new notes
				newNotes: newNotes,
				setNewNotes: setNewNotes,
				// For new user
				newUser: newUser,
				setNewUser: setNewUser,

				//
				getUserNotes: getUserNotes,
				// close or open side bar which is in Navbar component
				side_bar: side_bar,

				deleteHandler: deleteHandler,
				editHandler: editHandler,
			}}>
			{props.children}
		</myContext.Provider>
	);
};

export default ContextStore;
