import React from 'react';
import './css/Login.css';
import { Redirect } from 'react-router-dom';
import Toast from './Component/Toast.js';

// context API
import { myContext } from './ContextProvider';
let err_label = null; // use ref

const Login = () => {
	const contextData = React.useContext(myContext);

	const user = contextData.user;
	const users = contextData.users;
	const setUser = contextData.setUser;
	const isLoggedIn = contextData.isLoggedIn;
	const setLogin = contextData.setLogin;
	const getUserNotes = contextData.getUserNotes;

	const changeHandler = (event) => {
		setUser({
			...user,
			[event.target.name]: event.target.value,
		});
	};

	const loginHandler = (event) => {
		let msg = '';
		event.preventDefault();
		// console.log('login Handler');
		if (!user.username && !user.password) {
			msg = 'Plz fill all fields.';
		} else if (!user.username) {
			msg = 'Plz fill all fields.';
		} else if (!user.password) {
			msg = 'Plz fill all fields.';
		} else {
			let passwords = [];
			let usernames = [];
			for (let i = 0; i < users.length; i++) {
				passwords[i] = users[i].password;
				usernames[i] = users[i].username;
			}
			// console.log('passwords, usernames', passwords, usernames);
			// console.log('user.username, usernames', user.username, user.password);

			for (let i = 0; i < users.length; i++) {
				let user_index = usernames.indexOf(user.username.trim(), i);
				let pass_index = passwords.indexOf(user.password.trim(), i);
				console.log('pass_index, user_index', pass_index, user_index);

				if (
					user_index !== -1 &&
					pass_index !== -1 &&
					user_index === pass_index
				) {
					setLogin(true);
					getUserNotes();
					window.localStorage.setItem('username', user.username);
					window.localStorage.setItem('password', user.password);
					Toast.makeToast('Login successful', Toast.LONG);
				} else if (user_index === -1) {
					msg = 'No such user name';
					break;
				} else if (pass_index === -1) {
					msg = 'Wrong password.';
					break;
				}
			}
		}
		if (err_label) {
			err_label.textContent = msg;
		}
	};

	return (
		<>
			{isLoggedIn && (
				<Redirect
					to={{
						pathname: '/',
						state: { referrer: 'hello', isLoggedIn: true },
					}}
				/>
			)}
			<div className="container-fluid">
				<div className="container ac_page p-sm-1 p-lg-5">
					<div className="row">
						<div className="col-12 col-md-6 py-5 mx-auto ">
							<h2 className="title mt-3"> Login </h2>
							<form>
								<div className="form-floating mt-4">
									<input
										className="form-control"
										type="text"
										name="username"
										placeholder="username"
										value={user.username}
										onChange={changeHandler}
										required
									/>
									<label forhtml="username">Enter username </label>
								</div>

								<div className="form-floating mt-4">
									<input
										className="form-control"
										type="text"
										name="password"
										placeholder="password"
										value={user.password}
										onChange={changeHandler}
										required
									/>
									<label forhtml="password">Enter password </label>
								</div>
								<div>
									<button
										className="btn btn-primary mt-4"
										onClick={loginHandler}>
										{' '}
										Login{' '}
									</button>
								</div>
							</form>
							<div
								className="text-center text-danger err_msg"
								ref={(ele) => (err_label = ele)}></div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
