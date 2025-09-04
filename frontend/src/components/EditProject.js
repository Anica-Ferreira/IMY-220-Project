/* Anica Ferreira u24581802 */
import React from "react";
import { useState } from "react";

export const EditProject = ({ project, onSave, onCancel }) => {
    const [formData, setFormData] = useState(project);

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
            <img src={formData.image} alt={`${formData.name}'s profile`} width={120} />

            <div>
                <label htmlFor="name">Project Name</label>
                <input id="name" value={formData.name} onChange={handleChange} />
            </div>

            <div>
                <label htmlFor="description">Description</label>
                <textarea id="description" value={formData.description} onChange={handleChange}></textarea>
            </div>

            <label htmlFor="type">Project Type</label>
            <select id="type" name="type" value={formData.type} onChange={handleChange}>
                <option value="desktop">Desktop Application</option>
                <option value="web">Web Application</option>
                <option value="mobile">Mobile Application</option>
                <option value="framework">Framework</option>
                <option value="library">Library</option>
            </select>

            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};