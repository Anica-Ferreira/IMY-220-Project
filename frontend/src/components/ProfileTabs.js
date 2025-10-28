/* Anica Ferreira 40_u24581802 */
import React, { useEffect } from "react";
import { useState } from "react";

import { Friends } from "./Friends";
import { ProjectList } from "./ProjectList";
import { ActivityList } from "./ActivityList";

export const ProfileTabs = ({user, viewOnly}) =>{
    const [activeTab, setActiveTab] = useState('activity');
    const [activity, setActivity] = useState([]);
    const [projects, setProjects] = useState([]);
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const switchTab = (tab) => setActiveTab(tab);

    //fetch activity for current user
    useEffect(() =>{
        const fetchAllData = async () => {
            if (!user._id) return;
            setLoading("true");
            setError("");

            try{
                //fetch in parallel
                const [activityRes, projectsRes, friendsRes] = await Promise.all([
                    fetch(`/api/activities/user/${user._id}`),
                    fetch(`/api/projects/user/${user._id}`),
                    fetch(`/api/users/friends/${user._id}`)
                ]);

                const activityData = await activityRes.json();
                const projectsData = await projectsRes.json();
                const friendsData = await friendsRes.json();

                //check for errors
                if (!activityRes.ok) throw new Error(activityData.error_message);
                if (!projectsRes.ok) throw new Error(projectsData.error_message);
                if (!friendsRes.ok) throw new Error(friendsData.error_message );

                setActivity(activityData);
                setProjects(projectsData);
                setFriends(friendsData);
            }catch(err){
                console.error(err);
            }finally{
                setLoading(false);
            }
        }
        fetchAllData();
    }, [user])

    if (loading) return <p>Loading profile data...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return(
        <div>
            <ul className="nav nav-tabs">
                {/* User Activity Feed */}
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === "activity" ? "active" : ""}`} 
                        onClick={() => switchTab("activity")}><i className="fa-solid fa-chart-line"></i> Activity
                    </button>
                </li>
                {/* Friends */}
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === "friends" ? "active" : ""}`} 
                        onClick={() => switchTab("friends")}><i className="fa-solid fa-user-friends"></i> Friends
                    </button>
                </li>
                {/* Projects */}
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === "projects" ? "active" : ""}`} 
                        onClick={() => switchTab("projects")}><i className="fa-solid fa-diagram-project"></i> Projects
                    </button>
                </li>
            </ul>
        
            {/* Tab Content */}
            <section className="tab-content">
                {activeTab === "activity" && (
                    <ActivityList activities={activity} showAll={false} type="profile"/>
                )}

                {activeTab === "friends" && (
                    <Friends friends={friends} currentUser={user} viewOnly={viewOnly}/>
                )}

                {activeTab === "projects" && (
                    <div> 
                        <ProjectList projects={projects} />
                    </div>
                )}
            </section>
        </div>
    );
};