/* Anica Ferreira 40_u24581802 */
import React from "react";
import { useState } from "react"; 
import { EditProject } from "./EditProject";
import { useNavigate, Link } from "react-router-dom";


export const ProjectInfo = ({project, onSave, isOwner, isMember}) =>{
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    //UPDATE PROJECT
    const handleSave = async (updatedProject) => {
        setSaving(true);

        try{
            const res = await fetch(`/api/projects/update/${project._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: updatedProject.name,
                    image: updatedProject.image,
                    type: updatedProject.type,
                    description: updatedProject.description,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                onSave(data.project);
                setIsEditing(false);
            }

        }catch(err){
            console.error(err);
        }finally{
            setSaving(false);
        }
    };

    //DELETE PROJECT
    const handleDeleteProject = async () => {
        if(!project) return;
        setDeleting(true);

        try{
            const res = await fetch(`/api/projects/delete/${project._id}`, {
                method: "DELETE",
            });
        
            if(res.ok){
                navigate("/projects");
            }

        }catch(err){
            console.error(err);
        }finally {
            setDeleting(false);
        }
    };

    return(
        <article className="project-info shadow-sm">
            {!isEditing ? (
                <>
                    <img src={project.image} alt={`${project.name}'s profile picture.`}/>

                    <h2>{project.name}</h2>
                    <h3>{project.type}</h3>

                    <p>{project.description}</p>

                    <strong>Version {project.version}</strong><br/>
                    <strong>Created on {new Date(project.createdAt).toLocaleDateString()}</strong><br/>
                    <strong>Status {project.status} {/*<button>{project.status === "Checked in" ? "Check out" : "Check in"}</button>*/}</strong><br/><br/>

                    {/*Add edit and delete button if the user is owner*/}
                    {isOwner && (
                        <>
                            <button onClick={() => setIsEditing(true)}>Edit Project</button>
                            <button  onClick={handleDeleteProject} disabled={deleting}>{deleting ? "Deleting..." : "Delete Project"}</button>
                        </>
                    )}
                </>
            ) : (
                <EditProject project={project} onSave={handleSave} onCancel={() => setIsEditing(false)} />
            )}
            <hr></hr>
                    <h3>Tags</h3>
                    <div className="tags">
                        {(project.languages || []).map((tag, index) => (
                            <Link key={index} to={`/results?hashtag=${encodeURIComponent(tag)}`} className="mx-1">
                                #{tag.toLowerCase()}
                            </Link>
                        ))}
                    </div>
        </article>
    )
};