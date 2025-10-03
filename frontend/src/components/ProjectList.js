/* Anica Ferreira 40_u24581802 */
import React from "react";
import { ProjectPreview } from "./ProjectPreview";

export const ProjectList = ({ projects }) =>{
    return(
        <div>
            {projects.map((project, index) => (
                <div key={index} className="card mb-3">
                    <ProjectPreview project={project} />
                </div>
            ))}
        </div>
    );
};