/* Anica Ferreira 40_u24581802 */
import React from "react";
import { useState, useEffect } from "react"; 
import { EditProject } from "./EditProject";
import { useNavigate, Link } from "react-router-dom";
import {PopupModel } from "./PopupModel"

export const ProjectInfo = ({project, onSave, isOwner, isAdmin}) =>{
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [checkedOutUser, setCheckedOutUser] = useState(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            if (project.status === "Checked out" && project.checkedOutBy) {
                try {
                    const res = await fetch(`/api/users/${project.checkedOutBy}`);
                    if (res.ok) {
                        const data = await res.json();
                        setCheckedOutUser(data);
                    }
                }catch(err){
                    console.error("Error fetching user:", err);
                }
            }
        };
        fetchUser();
    }, [project.status, project.checkedOutBy]);

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
                if(isAdmin){
                    navigate("/admin");
                }else{
                    navigate("/projects");
                }
            }

        }catch(err){
            console.error(err);
        }finally {
            setDeleting(false);
        }
    };

    return(
        <article className="info-layout card shadow-sm">
            {!isEditing ? (
                <>  
                    <div className="img-layout">
                        <h2>{project.name}</h2>
                        <img className="project-img" src={project.image} alt={`${project.name}'s profile picture.`}/>
                    </div>
                    
                    <div className="layout-center">
                        <h3>{project.type}</h3>
                        <p>{project.description}</p>
                    </div>
                    
                    <div className="layout-details">
                        <hr/>
                        <p>Version: {project.version}</p>
                        <p className="mb-2">Created on: {new Date(project.createdAt).toLocaleDateString()}</p>
                        {isOwner && 
                            <>
                                <p>Status: {project.status}{project.status === "Checked out" && checkedOutUser ? ` by ${checkedOutUser.username}`: ""}</p>
                            </>
                        }
                    </div>
                    <hr/>
                    <div className="tags project-tags">
                        {(project.languages || []).map((tag, index) => (
                            <Link key={index} to={`/results?hashtag=${encodeURIComponent(tag)}`} className="mx-1">
                                #{tag.toLowerCase()}
                            </Link>
                        ))}
                    </div>
                    

                    {/*Add edit and delete button if the user is owner*/}
                    {isOwner && (
                        <div className="layout-actions">
                            <span onClick={() => setShowDeletePopup(true)} disabled={deleting}><i className="fas fa-trash"></i></span>
                            <span onClick={() => setIsEditing(true)}><i className="fas fa-edit"></i></span>
                        </div>
                    )}
                </>
            ) : (
                <EditProject project={project} onSave={handleSave} onCancel={() => setIsEditing(false)} />
            )}
            
                    

                    {/* DeletePopup */}
                    <PopupModel
                            visible={showDeletePopup}
                            title="Confirm Delete"
                            message="Are you sure you want to delete this project?"
                            isConfirmation={true}
                            onConfirm={async () => {
                                setShowDeletePopup(false);
                                await handleDeleteProject();
                        }}
                            onCancel={() => setShowDeletePopup(false)}
                    />
        </article>
    )
};