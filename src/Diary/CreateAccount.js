import React from 'react';
import Toast from './Component/Toast.js';
// Password hash
import bcrypt from 'bcryptjs';
import { myContext } from './ContextProvider';

const CreateAccount = () => {
	const contextData = React.useContext(myContext);
	const newUser = contextData.newUser;

	const changeHandler = (event) => {
		let name = event.target.name;
		let value = event.target.value;
		contextData.setNewUser({ ...newUser, [name]: value });
	};
	const submitHandler = async (event) => {
		event.preventDefault();

		let msg = '';
		console.log('submit button clicked');
		if (
			!newUser.username &&
			!newUser.name &&
			!newUser.email &&
			!newUser.password &&
			!newUser.re_password &&
			!newUser.password &&
			!newUser.re_password
		) {
			msg = 'Plz fill all fields';
		} else if (!newUser.email.endsWith('@gmail.com')) {
			msg = 'Email incorrect';
		} else if (
			newUser.username &&
			newUser.name &&
			newUser.email &&
			newUser.password &&
			newUser.re_password &&
			newUser.password === newUser.re_password
		) {
			delete newUser.re_password;

			const hash_password = await bcrypt.hash(newUser.password, 10);

			contextData.postHandler(event, {
				...newUser,
				password: hash_password,
				isCreateUser: true,
				timestamp: new Date().toLocaleString(),
			});
		} else if (
			(!newUser.password && !newUser.re_password) ||
			newUser.password !== newUser.re_password
		) {
			msg = 'Password not same';
		} else {
			// Toast.makeToast('Plz fill all fields', Toast.LONG);
		}
		if (msg) {
			Toast.makeToast(msg, Toast.LONG);
		}
	};
	return (
		<div className="container-fluid">
			<div className="container ac_page px-sm-0 px-md-5">
				<div className="row">
					<div className="col-12 col-md-8 p-3 mx-auto">
						<h2 className="title mt-3"> Create Account </h2>
						<form>
							<div className="form-floating mt-4">
								<input
									className="form-control"
									type="text"
									name="username"
									placeholder="username"
									value={newUser.username}
									onChange={changeHandler}
									required
								/>
								<label htmlFor="username">Enter username </label>
							</div>
							<div className="form-floating mt-4">
								<input
									className="form-control"
									type="text"
									name="name"
									placeholder="name"
									value={newUser.name}
									onChange={changeHandler}
									required
								/>
								<label htmlFor="name">Enter name </label>
							</div>
							<div className="form-floating mt-4">
								<input
									className="form-control"
									type="email"
									name="email"
									placeholder="email"
									value={newUser.email}
									onChange={changeHandler}
									required
								/>
								<label htmlFor="email">Enter email </label>
							</div>
							<div className="form-floating mt-4">
								<input
									className="form-control"
									type="text"
									name="password"
									placeholder="pass"
									value={newUser.password}
									onChange={changeHandler}
									required
								/>
								<label htmlFor="password">Enter password </label>
							</div>
							<div className="form-floating mt-4">
								<input
									className="form-control"
									type="text"
									name="re_password"
									placeholder="email"
									value={newUser.re_password}
									onChange={changeHandler}
									required
								/>
								<label htmlFor="re_password">Enter re-password </label>
							</div>
							<div>
								<button
									className="btn btn-primary mt-4"
									onClick={submitHandler}>
									{' '}
									Submit{' '}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateAccount;
