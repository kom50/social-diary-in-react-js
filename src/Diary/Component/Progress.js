import React from 'react';
import './Progress.css';

const Progress = (props) => {
	console.log(props.isOpen);
	return (
		<>
			{props.isOpen ? (
				<div className="bg_loader">
					<div className="loader"></div>;
				</div>
			) : null}
		</>
	);
};

export default Progress;
