import React from "react";

const Modal = ({children, display, onClose, settings={color: "black", backgroundColor: "white"}}) => {

	const containerStyle = {
		display: display === true ? "block" : "none",
		position: "fixed",
		top: 0,
		left: 0,
		width: '100vw',
		height: '100vh',
		padding: 0,
	}

	const overlayStyle = {
		position: "absolute",
		width: "100%",
		height: "100%",
		background: "#333333d3",
	}

	const modalStyle = {
		display: "block",
		width: "95%",
		height: "auto",
		maxWidth: "500px",
		minWidth: "300px",
		padding: "30px",
		background: "#fff",
		borderRadius: "5px",
		position: "absolute",
		top: "40%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	}

	const messageStyle = {
		marginBottom: "10px",
		fontFamily: "Montserrat, sans-serif",
		fontSize: "1.5rem",
		fontWeight: 500,
		textAlign: "center",
	}

	const buttonStyle = {
		display: "block",
		width: "100%",
		padding: "8px",
		fontSize: "1rem",
		fontWeight: "bold",
		marginTop: "1rem",
		backgroundColor: settings.backgroundColor,
		color: settings.color,
		cursor: "pointer",
	}

	return (
		<div style={containerStyle}>
			<div style={overlayStyle}></div>
			<div style={modalStyle}>
				<div style={messageStyle}>{children}</div>
				<div style={buttonStyle} onClick={()=>onClose()}>
					OK
				</div>
			</div>
		</div>
	);
}

export default Modal;