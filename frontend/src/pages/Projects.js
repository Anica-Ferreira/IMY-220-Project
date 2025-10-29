/* Anica Ferreira 40_u24581802 */
import React from "react";
import { useState, useEffect } from "react";
import { ProjectList } from "../components/ProjectList";
import { CreateProject } from "../components/CreateProject";
import { Loader } from "../components/Loader";

export const Projects = () =>{
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showCreate, setShowCreate] = useState(false);
    
    useEffect(() =>{
         const fetchProjects = async () => {
            setLoading(true);
            setError("");
            try{
                const res = await fetch("/api/projects");
                if(res.ok) {
                    const data = await res.json();
                    setProjects(data);
                }

            }catch (err) {
                console.error(err);
                setError(err.message);
            }finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [])

    return( 
        <div>
            <h1>Projects</h1>

            <button onClick={() => setShowCreate(true)} >New Project <i className="fas fa-plus"></i></button>

            {error && <p className="text-danger">{error}</p>}

            {!loading && !error && <ProjectList projects={projects} />}

            {/* Modal overlay */}
            {showCreate && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <CreateProject onClose={() => setShowCreate(false)}/>
                    </div>
                </div>
            )}

            {loading && (
                <div className="loader-overlay">
                    <Loader />
                </div>
            )}
        </div>
    )
};