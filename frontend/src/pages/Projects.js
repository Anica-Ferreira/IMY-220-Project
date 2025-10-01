/* Anica Ferreira 40_u24581802 */
import React from "react";
import { useState, useEffect } from "react";
import { ProjectList } from "../components/ProjectList";
import { Search } from "../components/Search";

export const Projects = () =>{
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
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
            <Search />

            {loading && <p>Loading projects...</p>}
            {error && <p className="text-danger">{error}</p>}

            {!loading && !error && <ProjectList projects={projects} />}
        </div>
    )
};