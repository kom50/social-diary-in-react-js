import React from 'react';
import './css/Navbar.css';
import { NavLink } from 'react-router-dom';
// React Icons;
import {
	MdMenu,
	MdAccountCircle,
	MdEditNote,
	MdDashboard,
	MdHome,
} from 'react-icons/md';

import { BiLogOutCircle } from 'react-icons/bi';
// context API
import { myContext } from './ContextProvider';

const Navbar = () => {
	const contextData = React.useContext(myContext);
	const isLoggedIn = contextData.isLoggedIn;

	const activeStyle = {
		color: 'BLACK',
		borderRadius: '4px',
	};

	const clickHandler = (event) => {
		console.log('menu button clicked');
		contextData.side_bar.classList.toggle('show');
		event.stopPropagation();
	};

	// icon style
	const iconStyle = { position: 'relative', left: -10, fontSize: 22 };

	return (
		<div className="nav heading container-fluid bg-info">
			<div
				className={
					!isLoggedIn
						? 'title_container container-fluid not_login'
						: 'title_container'
				}>
				<h3 className="title mt-2 text-light font-weight-light small">
					Social Diary
				</h3>
				<p>Share your story with others</p>
			</div>
			{(() => {
				if (isLoggedIn)
					return (
						<div className="user">
							{isLoggedIn && (
								<button
									onClick={clickHandler}
									className="btn btn-light menu-btn"
									type="button">
									<MdMenu />
								</button>
							)}
							<div
								className="side_bar "
								ref={(ele) => (contextData.side_bar = ele)}>
								<div className="user_ac ">
									<MdAccountCircle className="icons" />
									{contextData.user.username}
								</div>
								<ul>
									<li onClick={clickHandler}>
										<NavLink
											className="nav-link"
											activeStyle={activeStyle}
											to="/"
											exact>
											<MdHome style={iconStyle} />
											Home
										</NavLink>
									</li>
									<li onClick={clickHandler}>
										<NavLink
											className="nav-link"
											activeStyle={activeStyle}
											to="/dashboard"
											exact>
											<MdDashboard style={iconStyle} />
											Dashboard
										</NavLink>
									</li>
									<li onClick={clickHandler} /* onClick={newNotesHandler} */>
										<NavLink
											className="nav-link"
											activeStyle={activeStyle}
											to="/newnotes"
											exact>
											<MdEditNote style={iconStyle} />
											New Notes
										</NavLink>
									</li>

									<li
										onClick={(event) => {
											clickHandler(event);
											console.log('logout');
											contextData.setLogin(false);
											contextData.setUser({
												username: '',
												password: '',
												notes: [],
											});
											window.localStorage.clear();
										}}>
										<NavLink
											className="nav-link"
											activeStyle={activeStyle}
											to="/"
											exact>
											<BiLogOutCircle style={iconStyle} /> {'  '}Logout
										</NavLink>
									</li>
								</ul>
							</div>
						</div>
					);
				else
					return (
						<div className="guest">
							<ul>
								<li>
									<NavLink
										className="nav-link"
										activeStyle={activeStyle}
										to="/"
										exact>
										Home
									</NavLink>
								</li>
								<li>
									<NavLink
										className="nav-link"
										activeStyle={activeStyle}
										to="/createaccount"
										exact>
										{/* Create Account */}
										SignUp
									</NavLink>
								</li>
								<li>
									<NavLink
										className="nav-link"
										activeStyle={activeStyle}
										to="/login"
										exact>
										SignIn
									</NavLink>
								</li>
							</ul>
						</div>
					);
			})()}
		</div>
	);
};

export default Navbar;
