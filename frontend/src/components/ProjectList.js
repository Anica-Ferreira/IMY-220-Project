/* Anica Ferreira 40_u24581802 */
import React from "react";
import { ProjectPreview } from "./ProjectPreview";

export const ProjectList = ({ projects }) =>{
    return(
        <div>
            {projects.map((project, index) =>(
                <ProjectPreview key={index} project={project} />
            ))}
        </div>
    );
};