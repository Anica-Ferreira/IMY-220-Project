/* Anica Ferreira 40_u24581802 */
import React from "react";
import { ProjectList } from "../components/ProjectList";
import { ProfilePreview } from "../components/ProfilePreview";
import { ActivityList } from "../components/ActivityList";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Loader } from "../components/Loader";

export const Results = () =>{
    const [searchResults, setSearchResults] = useState({ users: [], projects: [], activities: [] });
    const { users, projects, activities } = searchResults || {};
    const location = useLocation(); //read url
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams(location.search);
                const q = params.get("q");
                const hashtag = params.get("hashtag");

                const queryParams = new URLSearchParams();
                if (q) queryParams.append("q", q);
                if (hashtag) queryParams.append("hashtag", hashtag);

                const url = `/api/search?${queryParams.toString()}`;
                const res = await fetch(url);
                const data = await res.json();

                //format activites to inclde user and project details
                let filteredActivities = [];

                if (data.activities && data.activities.length > 0) {
                    const activityIds = data.activities.map(act => act._id);

                    const activitiesRes = await fetch("/api/activities/formatted");
                    const allActivities = await activitiesRes.json();

                    filteredActivities = allActivities.filter(act =>activityIds.includes(act._id));
                }

                setSearchResults({
                    users: data.users,
                    projects: data.projects,
                    activities: filteredActivities
                });
            } catch (err) {
                console.error("Search error:", err);
            }finally{
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [location.search]);

    return(
        <div id="searchr">
            <h1 className="text-center">Search Results</h1>
            
            {/* Profiles */}
            {users && users.length > 0 && (
                <section className="card mb-4">
                <h2 className="mt-1">Users</h2>
                {users.map((user) => (
                    <div className="mb-3">
                        <ProfilePreview key={user._id} profile={user}/>
                    </div>
                    
                ))}
                </section>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
                <section className="card mb-4">
                <h2 className="mt-1">Projects</h2>
                <ProjectList projects={projects} display={"list"} />
                </section>
            )}

            {/* Activities */}
            {activities && activities.length > 0 && (
                <section className="card mb-4">
                <h2 className="mt-1">Activities</h2>
                <ActivityList activities={activities} showMessage={true} showAll={false} />
                </section>
            )}

            {/* No results */}
            {!loading && !users?.length && !projects?.length && !activities?.length && (
                <p className="text-white text-center fs-5">No results found.</p>
            )}

            { loading && <
                div className="overlay">
                    <Loader />
                </div>
            }
        </div>
    )
};