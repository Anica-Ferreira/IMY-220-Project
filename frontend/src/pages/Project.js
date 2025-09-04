/* Anica Ferreira u24581802 */
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { ProjectInfo } from "../components/ProjectInfo";
import { ProjectTabs } from "../components/ProjectTabs";


import projectData from "../data/projects.json";
import userData from "../data/users.json";

export const Project = () =>{
    //get projectId
    const { projectId } = useParams();
    const project = projectData.find(p => p.id === projectId);

    const [currentProject, setCurrentProject] = useState(project);

    const handleSave = (updatedProject) => {
        setCurrentProject(updatedProject);
    };

    //harcoded as u1 viewing the projects page for now
    const user = userData.find(u => u.id === "u1");

    return (
        <div>
            <Header isAuthenticated={true}/>
            <main>         
                <ProjectInfo project={currentProject} user={userData} onSave={handleSave} />
                <ProjectTabs project={currentProject}/>
            </main>
        </div>
    );
};