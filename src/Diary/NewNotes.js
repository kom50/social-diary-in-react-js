import React from 'react';
import { Link /*, useLocation */, Redirect } from 'react-router-dom'; // React Router
import './css/NewNotes.css'; // css file
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi'; // React icons
// Context API
import { myContext } from './ContextProvider';

const NewNotes = () => {
	// const data = useLocation().state;
	// console.log('url ', data);
	const contextData = React.useContext(myContext);

	const [isClick, setClick] = React.useState(false);

	const newNotes = contextData.newNotes;

	const changeHandler = (event) => {
		let name = event.target.name;
		let value = event.target.value;
		contextData.setNewNotes({ ...newNotes, [name]: value });
	};

	const saveHandler = (event) => {
		if (newNotes.isUpdate) {
			delete contextData.newNotes.isUpdate;
			contextData.editHandler(event, newNotes.id);
		} else {
			contextData.postHandler(event, {
				...newNotes,
				author: contextData.user.username,
				isCreateUser: false,
			});
		}
		setClick(true);
	};

	return (
		<>
			{isClick && (
				<Redirect
					to={{
						pathname: '/dashboard',
						state: { referrer: 'hello', isLoggedIn: true },
					}}
				/>
			)}
			<div className="new_notes">
				<div className="card">
					<div className="card-header bg-info p-3">
						<div className="input-group">
							<Link
								to="/dashboard"
								className="close"
								onClick={() => {
									console.log('close button clicked');
								}}>
								{' '}
								<HiOutlineArrowNarrowLeft />
							</Link>
							<input
								type="text"
								name="title"
								className="form-control "
								placeholder="Title..."
								value={newNotes.title}
								onChange={changeHandler}
							/>
						</div>
					</div>
					<div className="card-body">
						<textarea
							className="form-control"
							name="content"
							cols="30"
							rows="10"
							placeholder="Notes..."
							value={newNotes.content}
							onChange={changeHandler}></textarea>
						<button className="btn btn-success mt-3" onClick={saveHandler}>
							{newNotes.isUpdate ? 'Update' : 'Save'}
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default NewNotes;
