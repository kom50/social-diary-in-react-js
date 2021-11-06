import React, { useState } from 'react';
import ViewNote from './ViewNote';
import './css/Home.css';

import { myContext } from './ContextProvider';

const Home = () => {
	const contextData = React.useContext(myContext);
	const allNotes = contextData.allNotes;
	// design start
	return (
		<>
			<div className="row">
				<div className="col-12 col-md-8  mx-auto position-relative py-3">
					<div className="show_notes">
						{allNotes.length > 0 &&
							allNotes.map((note, index) => {
								return <Note key={index} note={note} />;
							})}
					</div>
				</div>
			</div>
		</>
	);
};

const Note = ({ note }) => {
	const [isClick, setClick] = useState(false);
	return (
		<div className="notes card">
			{isClick && (
				<ViewNote
					note={note}
					closeHandler={() => {
						setClick(false);
						console.log('closed');
					}}
				/>
			)}
			<div className="card-body">
				<h5 className="card-title"> {note.title}</h5>
				<p className="card-text small">
					{note.author} {note.date}
				</p>
				<button
					className="btn btn-info"
					onClick={() => {
						setClick(true);
					}}>
					{' '}
					See more
				</button>
			</div>
		</div>
	);
};

export default Home;
