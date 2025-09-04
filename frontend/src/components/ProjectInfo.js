/* Anica Ferreira u24581802 */
import React from "react";
import { useState } from "react"; 
import { EditProject } from "./EditProject";

export const ProjectInfo = ({project, onSave}) =>{
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = (updatedProject) => {
        onSave(updatedProject);
        setIsEditing(false);
    }

    return(
        <article>
            {!isEditing ? (
                <>
                    <img src={project.image} alt={`${project.name}'s profile picture.`} width={120} />
                    <h2>{project.name}</h2>
                    <h3>{project.type}</h3>

                    <p>{project.description}</p>

                    <strong>Version {project.version}</strong><br/>
                    <strong>Created on {project.createdAt}</strong><br/>
                    <strong>Status {project.status} <button>{project.status === "Checked in" ? "Check out" : "Check in"}</button></strong><br/><br/>

                    {/*Add edit and delete button if the user is owner*/}
                    {/*Hardcoded for now so that it checks for u1 to be the ownder*/}
                    {project.ownerId == "u1" && (
                        <>
                            <button onClick={() => setIsEditing(true)}>Edit Project</button>
                            <button>Delete Project</button>
                        </>
                    )}
                </>
            ) : (
                <EditProject project={project} onSave={handleSave} onCancel={() => setIsEditing(false)} />
            )}
            <hr></hr>
                    <h3>Tags</h3>
                    <div>
                        {project.hashtags?.map((tag, index) => (
                            <span key={index}>{tag} </span>
                        ))}
                    </div>
        </article>
    )
};