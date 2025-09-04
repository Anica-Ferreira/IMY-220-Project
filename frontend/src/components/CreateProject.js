/* Anica Ferreira u24581802 */
import React from "react";

export const CreateProject = () =>{

    return(
        <form>
            <label htmlFor="image">Project Image (max 5MB)</label><br/>
            <input id="image" name="image" type="file" accept="image/*" /><br/>

            <label htmlFor="name">Project Name</label><br/>
            <input id="name" name="name" type="text"/><br/>

            <label htmlFor="description">Description</label><br/>
            <textarea id="description" name="description"/><br/>

            <label htmlFor="type">Project Type</label><br/>
            <select id="type" name="type">
                <option value="desktop">Desktop Application</option>
                <option value="web">Web Application</option>
                <option value="mobile">Mobile Application</option>
                <option value="framework">Framework</option>
                <option value="library">Library</option>
            </select><br/>

            <label htmlFor="hashtags">Programming Languages (hashtags)</label><br/>
            <input id="hashtags" name="hashtags" type="text" placeholder="#JavaScript #Python" /><br/>

            <label htmlFor="version">Version</label><br/>
            <input id="version" name="version" type="text" readOnly  defaultValue="1.0.0" /><br/>

            <label htmlFor="files">Project Files (first check-in)</label><br/>
            <input id="files" name="files" type="file" multiple/><br/>

            <button type="submit">Create Project</button>
        </form>
    )
};