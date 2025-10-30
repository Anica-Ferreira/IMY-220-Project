/* Anica Ferreira 40_u24581802 */
import React from "react";

export const PopupModel = ({ visible, title, message, isConfirmation = false, onConfirm, onCancel, onClose }) => {
    if(!visible) return null;

    return (
        <div className="overlay">
        <div className="popup">
            <h3>{title}</h3>
            <p>{message}</p>

            {isConfirmation ? (
            <div className="buttons">
                <button className="btn-grey mx-4" onClick={onCancel}>No</button>
                <button className="btn-red" onClick={onConfirm}>Yes</button>
            </div>
            ) : (
            <div className="buttons">
                <button className="btn-red" onClick={onClose}>OK</button>
            </div>
            )}
        </div>
        </div>
    );
};
