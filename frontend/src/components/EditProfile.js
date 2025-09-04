/* Anica Ferreira u24581802 */
import React from "react";
import { UserProfile } from "./ProfileInfo";
import { useState } from "react";

export const EditProfile = ({ user, onSave, onCancel }) => {
    const [formData, setFormData] = useState(user);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <img src={formData.image} alt={`${formData.username}'s profile`}  width={120}/>

            <div>
                <label htmlFor="name">Full Name</label>
                <input id="name" value={formData.name} onChange={handleChange} />
            </div>

            <div>
                <label htmlFor="about">About</label>
                <textarea id="about" value={formData.about} onChange={handleChange}></textarea>
            </div>

            <div>
                <label htmlFor="role">Role</label>
                <input id="role" value={formData.role} onChange={handleChange} />
            </div>

            <div>
                <label htmlFor="company">Company</label>
                <input id="company" value={formData.company} onChange={handleChange} />
            </div>

            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};