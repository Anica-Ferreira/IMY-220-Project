/* Anica Ferreira 40_u24581802 */
import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ProjectInfo } from "../components/ProjectInfo";
import { ProjectTabs } from "../components/ProjectTabs";
import { Loader } from "../components/Loader";

export const Project = () =>{
    const { projectId } = useParams();
    const [currentProject, setCurrentProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const isAdmin = params.get("adminManage") === "true";

    useEffect(() =>{
        const fetchProject = async () => {
            setLoading(true);
            try{
                const res = await fetch(`/api/projects/${projectId}`);
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

    if (loading || !currentProject) 
    return (
        <div className="loader-overlay">
            <Loader />
        </div>
    );

    if (error) return <p className="text-danger">{error}</p>;

    //determine view type
    const sessionUserId = sessionStorage.getItem("userId");
    const isOwner = currentProject?.owner?.toString() === sessionUserId || isAdmin;
    const isMember = Array.isArray(currentProject?.members) && currentProject.members.some(memberId => memberId.toString() === sessionUserId);

    return (
        <div>
            {isAdmin && <h1>Manage Project</h1>}
            <ProjectInfo project={currentProject} onSave={handleSave} isMember={isMember} isOwner={isOwner} isAdmin={isAdmin}/>
            <ProjectTabs project={currentProject} isMember={isMember} isOwner={isOwner} onUpdate={handleSave}/>
        </div>
    );
};