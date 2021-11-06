import './Toast.css';

// Toast class only have a static members
export default class Toast {
	// static variables
	static SHORT = 1000;
	static LONG = 2000;
	// static function
	static makeToast = function (msg, duration, callback) {
		const toastPanel = document.createElement('div');
		document.documentElement.appendChild(toastPanel);
		toastPanel.innerHTML = msg;
		Object.assign(toastPanel.style, {
			width: '200px',
			height: 'auto',
			lineHeight: 'auto',
			padding: '5px',
			backgroundColor: 'rgba(0, 0, 0, 0.8)',
			color: 'white',
			textAlign: 'center',
			position: 'fixed',
			// top: 120 + 'px',
			bottom: 30 + 'px',
			'z-index': 14,
			'border-radius': '3px',
			transition: 'all .5s linear',
			animationName: 'zoom',
			animationDuration: '0.2s',
			left: (window.innerWidth - 200) / 2 + 'px', // center
		});
		// center position
		// left : (parentWidth - childWidth ) / 2

		// Toast remove
		setTimeout(() => {
			document.documentElement.removeChild(toastPanel);
			callback && callback();
		}, duration);
	};
}
