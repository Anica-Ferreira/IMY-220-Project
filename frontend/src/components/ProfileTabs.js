/* Anica Ferreira 40_u24581802 */
import React from "react";
import { useState } from "react";

import { CreateProject } from "./CreateProject";
import { Friends } from "./Friends";
import { ProjectList } from "./ProjectList";
import { ActivityList } from "./ActivityList";

//dummy data
import userData  from "../data/users.json";
import projectData from "../data/projects.json";

export const ProfileTabs = ({user}) =>{
    const [activeTab, setActiveTab] = useState('activity');
    const switchTab = (tab) => setActiveTab(tab);

    const handleRemoveFriend = () =>{}

    return(
        <div>
            <ul className="nav nav-tabs">
                {/* User Activity Feed */}
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === "activity" ? "active" : ""}`} 
                        onClick={() => switchTab("activity")}>Activity
                    </button>
                </li>
                {/* Friends */}
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === "friends" ? "active" : ""}`} 
                        onClick={() => switchTab("friends")}>Friends
                    </button>
                </li>
                {/* Projects */}
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === "projects" ? "active" : ""}`} 
                        onClick={() => switchTab("projects")}>Projects
                    </button>
                </li>
                {/* New Project */}
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === "new" ? "active" : ""}`} 
                        onClick={() => switchTab("new")}>New Project
                    </button>
                </li>
            </ul>
        
            {/* Tab Content */}
            <section className="tab-content">
                {activeTab === "activity" && (
                    <ActivityList projects={projectData} userId={user.id} onlyUserActivity={true} />
                )}

                {activeTab === "friends" && (
                    <Friends user={user} onRemoveFriend={handleRemoveFriend}/>
                )}

                {activeTab === "projects" && (
                    <div> 
                        <ProjectList projects={projectData} />
                    </div>
                )}

                {activeTab === "new" && (
                    <CreateProject />
                )}
            </section>
        </div>
    );
};