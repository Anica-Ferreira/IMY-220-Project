/* Anica Ferreira u24581802 */
import React from "react";
import { Header } from "../components/Header";
import { ProjectList } from "../components/ProjectList";

//dummy data
import projectData from "../data/projects.json";

export const Projects = () =>{
    return(
        <div>
            <Header isAuthenticated={true}/>
            <h1>Projects</h1>
            <ProjectList projects={projectData} />
        </div>
    )
};