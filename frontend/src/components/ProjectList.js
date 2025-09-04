/* Anica Ferreira u24581802 */
import React from "react";
import { ProjectPreview } from "./ProjectPreview";

export const ProjectList = ({ projects }) =>{
    return(
        <section>
            {projects.map((project) =>(
                <ProjectPreview key={project.id} project={project} />
            ))}
        </section>
    );
};