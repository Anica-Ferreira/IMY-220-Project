/* Anica Ferreira 40_u24581802 */
import React from "react";
import { Link } from "react-router-dom";

export const ProjectPreview = ({ project }) =>{
    return(
        <article className="project-preview">
            
        <div className="project-preview-header">
            <img src={project.image} alt={`${project.name} thumbnail`} />
            <div className="project-preview-text">
                <Link to={`/projects/${project._id}`}>
                    <strong>{project.name}</strong>
                </Link>
                <div className="project-preview-description">{project.description}</div>
            </div>
        </div>

        <p className="project-preview-languages">
            {project.languages && project.languages.map((lang, index) => (
                <Link key={index} to={`/results?hashtag=${encodeURIComponent(lang)}`}>
                    #{lang.toLowerCase()}
                </Link>
            ))}
            <span className="project-preview-download">
                <i className="fa-solid fa-download"></i>{project.downloads}
            </span>
        </p>

        </article>
    );
};