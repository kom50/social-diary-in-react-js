import React from 'react';
import './css/ViewNote.css';

const ViewNote = ({ note, closeHandler }) => {
	const { title, content, author, timestamp } = note;

	return (
		<div className="note_view">
			<div className="card_view card">
				<div className="card-header">
					<h3 className="header">{title}</h3>
					<span
						className="close"
						onClick={() => {
							closeHandler();
							console.log('close button clicked');
						}}>
						{' '}
						&times;
					</span>
				</div>
				<p className="small text-muted ms-3	my-2">
					{author},{'  '} {timestamp}
				</p>
				<div className="card-body">
					<p className="card-text">{content}</p>
				</div>
				<div className="card-footer">
					<small className="text-muted">{timestamp}</small>
				</div>
			</div>
		</div>
	);
};

export default ViewNote;
