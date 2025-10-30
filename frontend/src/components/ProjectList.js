/* Anica Ferreira 40_u24581802 */
import React from "react";
import { ProjectPreview } from "./ProjectPreview";

export const ProjectList = ({ projects, display="grid" }) =>{
    return(
        <div>
            {projects.length === 0 && 
                <div className="card">
                    {projects.length === 0 && <p>No projects yet.</p>}
                </div>
            }

            <div className={display === "grid" ? "project-grid" : ""}>
                {projects.map((project, index) => (
                    <div key={index} className="card mb-3">
                        <ProjectPreview project={project} showBookmark={true}/>
                    </div>
                ))}
            </div>
            
        </div>
    );
};