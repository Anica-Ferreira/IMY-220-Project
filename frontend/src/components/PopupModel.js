/* Anica Ferreira 40_u24581802 */
import React from "react";

export const PopupModel = ({ visible, title, message, isConfirmation = false, onConfirm, onCancel, onClose }) => {
    if(!visible) return null;

    return (
        <div className="popup-overlay">
        <div className="popup">
            <h3>{title}</h3>
            <p>{message}</p>

            {isConfirmation ? (
            <div className="buttons">
                <button onClick={onConfirm}>Yes</button>
                <button onClick={onCancel}>No</button>
            </div>
            ) : (
            <div className="buttons">
                <button onClick={onClose}>OK</button>
            </div>
            )}
        </div>
        </div>
    );
};
