/* Anica Ferreira 40_u24581802 */
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const ProjectPreview = ({ project, showBookmark = false }) =>{
    const [saved, setSaved] = useState(false);
    const currentUserId = sessionStorage.getItem("userId");

    //check if project is already saved
    useEffect(() => {
        if (!project.savedBy) return;
        setSaved(project.savedBy.includes(currentUserId));
    }, [project.savedBy, currentUserId]);
    
    const toggleSave = async () => {
        
        const endpoint = saved ? "/api/projects/unsave" : "/api/projects/save";

        try{
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: currentUserId, projectId: project._id })
            });

            if(res.ok) {
                setSaved(!saved);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return(
        <article className="project-preview">
            
        <div className="project-preview-header">
            <img src={project.image} alt={`${project.name} thumbnail`} />
            <div className="project-preview-text">
                <Link to={`/projects/${project._id}`} className="text-start">
                    <strong>{project.name}</strong>
                </Link>
                <div className="project-preview-description text-start">{project.description}</div>
            </div>
        </div>

        <p className="tags">

            <span className="tags-left">
                {project.languages && project.languages.map((lang, index) => (
                    <Link key={index} to={`/results?hashtag=${encodeURIComponent(lang)}`}>
                        #{lang.toLowerCase()}
                    </Link>
                ))}
            </span>
            
            <span className="tags-right">
                <span className="project-preview-download mx-2">
                    <i className="fa-solid fa-download me-1"></i>{project.downloads}
                </span>

                <span onClick={toggleSave} title="Save project">
                    <i className={saved ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"}></i>
                </span>
            </span>
            
        </p>

        </article>
    );
};