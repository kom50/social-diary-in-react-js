import React from 'react';
// password hash // 20/11/2021
import bcrypt from 'bcryptjs';

import './css/Login.css';
import { Redirect } from 'react-router-dom';
import Toast from './Component/Toast.js';

// context API
import { myContext } from './ContextProvider';

const Login = () => {
	const contextData = React.useContext(myContext);

	const user = contextData.user;
	const users = contextData.users;
	const setUser = contextData.setUser;
	const isLoggedIn = contextData.isLoggedIn;
	const getUserNotes = contextData.getUserNotes;

	const changeHandler = (event) => {
		setUser({
			...user,
			[event.target.name]: event.target.value,
		});
	};

	const loginHandler = async (event) => {
		let msg = '';
		event.preventDefault();
		// console.log('login Handler');
		if (
			(!user.username && !user.password) ||
			!user.password ||
			!user.username
		) {
			msg = 'Plz fill all fields.';
		} else {
			let passwords = [],
				usernames = [];
			for (let i = 0; i < users.length; i++) {
				passwords[i] = users[i].password;
				usernames[i] = users[i].username;
			}
			let user_index = usernames.indexOf(user.username);
			console.log(user_index, users, usernames, passwords);
			// username is present
			if (user_index !== -1) {
				// compare hash password to entered password is matched or not
				const isMatch = await bcrypt.compare(
					user.password,
					passwords[user_index]
				);

				if (isMatch) {
					// if (passwords[user_index] === user.password) {
					msg = 'Login successful';
					contextData.setLogin(true);
					contextData.setLogin(true);
					getUserNotes();
					contextData.setUser({ ...user, password: passwords[user_index] });
					window.localStorage.setItem('username', user.username);
					window.localStorage.setItem('password', passwords[user_index]);
				} else {
					msg = 'Wrong password.';
				}
			} else {
				msg = 'Login failed'; // for security purpose ->  we are not show the user name is available is our database
				// msg = 'No such user name';
			}
		}
		if (msg) {
			Toast.makeToast(msg, Toast.LONG);
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
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
