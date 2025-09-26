/* Anica Ferreira 40_u24581802 */
import React from "react";
import { Link } from "react-router-dom";

export const ProjectPreview = ({ project }) =>{
    return(
        <article>
            {/* Project image */}

            <div>
                <img src={project.image} alt={`${project.name} thumbnail image.`} width={50}/>

                {/* Link to dynamic project route */}
                <Link to={`/projects/${project.id}`}><strong>{project.name}</strong></Link>
                <div>{project.description}</div>
            </div>
            
            {/* Programming hastags */}
            <p>
                {project.hashtags.map((tag, index) =>(
                    <span key={index}>{tag} </span>
                ))}
            </p>
            
        </article>
    );
};