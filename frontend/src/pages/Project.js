/* Anica Ferreira 40_u24581802 */
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProjectInfo } from "../components/ProjectInfo";
import { ProjectTabs } from "../components/ProjectTabs";

export const Project = () =>{
    const { projectId } = useParams();
    const [currentProject, setCurrentProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() =>{
        const fetchProject = async () => {
            setLoading(true);
            try{
                const res = await fetch(`/projects/${projectId}`);
                if (res.ok) {
                    const data = await res.json();
                    setCurrentProject(data);;
                }
            }catch(err) {
                console.error(err);
                setError(err.message);
            }finally{
                setLoading(false);
            }
        };
        fetchProject();
    }, [projectId]);

    const handleSave = (updatedProject) => {
        setCurrentProject(updatedProject);
    };

    if (loading) return <p>Loading project...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div>
            <ProjectInfo project={currentProject} onSave={handleSave} />
            <ProjectTabs project={currentProject}/>
        </div>
    );
};