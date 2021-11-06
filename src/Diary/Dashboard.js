import React from 'react';
import './css/Dashboard.css';
import { MdEditNote, MdDelete } from 'react-icons/md';
import { Link, NavLink } from 'react-router-dom';
import ViewNote from './ViewNote';
// contextStore
import { myContext } from './ContextProvider';

const Dashboard = () => {
	const contextData = React.useContext(myContext);
	const notes = contextData.user.notes;

	return (
		<div className="dashboard container ">
			<h3 className="text-center dash">Dashboard</h3>
			<div className="new_note_btn">
				<Link to="/newnotes" className="btn btn-info text-white">
					<MdEditNote />{' '}
				</Link>
			</div>
			<div className="row">
				<div className="col-12 col-md-8 mx-auto">
					<ul className="list-group notes mx-auto">
						{notes.length !== 0 &&
							notes.map((note, index) => {
								return (
									<Card
										note={note}
										key={index}
										deleteHandler={contextData.deleteHandler}
										editHandler={contextData.editHandler}
									/>
								);
							})}
					</ul>
				</div>
			</div>
		</div>
	);
};

const Card = ({ note, deleteHandler }) => {
	const [isClick, setClick] = React.useState(false);
	const contextData = React.useContext(myContext);
	return (
		<>
			{isClick && (
				<ViewNote
					note={note}
					closeHandler={() => {
						setClick(false);
						console.log('closed');
					}}
				/>
			)}
			<li
				className="list-group-item list-group-item-action m-1 "
				onClick={() => {
					setClick(true);
				}}>
				<h6 className="header">{note.title}</h6>
				<p className="mx-auto"></p>
				<button
					title="Edit story"
					className="update_btn btn btn-outline-primary ms-1"
					onClick={(event) => {
						console.log(' note.id ----->   ', note.id);
						contextData.setNewNotes({ ...note, isUpdate: true });
						event.stopPropagation();
					}}>
					<NavLink
						className="  "
						to={{
							pathname: '/newnotes',
							state: { name: 'Update' },
						}}>
						{/* Edit */} <MdEditNote />
					</NavLink>
				</button>
				<button
					className="btn btn-outline-danger ms-1"
					title="Delete story"
					onClick={(event) => {
						event.stopPropagation();
						console.log(' note.id ----->   ', note.id);
						deleteHandler(event, note.id);
					}}>
					{/* Delete */} <MdDelete />
				</button>
			</li>
		</>
	);
};

export default Dashboard;
