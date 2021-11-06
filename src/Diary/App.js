import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import CreateAccount from './CreateAccount';
import Login from './Login';
import Navbar from './Navbar';
import './css/App.css';

import Dashboard from './Dashboard';
import NewNotes from './NewNotes';
import Progress from './Component/Progress';

import { myContext } from './ContextProvider';

//  🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
const App = () => {
	const contextData = React.useContext(myContext);

	return (
		<BrowserRouter>
			<div
				className="app_bg bg-light"
				onClick={() => {
					console.log('navbar close handler');
					if (contextData.side_bar)
						contextData.side_bar.classList.remove('show');
				}}>
				<Progress isOpen={!contextData.isLoaded} />
				<Navbar />
				<div className="container-fluid main">
					<Switch>
						{/* Switch - use when we add page not found page in our react application. this component render only matches component */}
						<Route path="/" component={Home} exact />
						<Route path="/createaccount" component={CreateAccount} exact />
						<Route path="/dashboard" component={Dashboard} exact />
						<Route path="/login" component={Login} exact />
						<Route path="/newnotes" component={NewNotes} exact />
						{/* <Route component={Error} exact /> */}
					</Switch>
				</div>
				<div className="footer container-fluid bg-secondary  text-white">
					<p className="small-text"> {contextData.user.username}</p>
				</div>
			</div>
		</BrowserRouter>
	);
};

export default App;
