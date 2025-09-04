/* Anica Ferreira u24581802 */
import React from "react";
import { useState } from "react";
import { ActivityList } from "./ActivityList";

//dummy data
import projects from "../data/projects.json"

export const Feed = () => {
    const [activeTab, setActiveTab] = useState('local');
    
    //hardcoded for now
    const currentUser = "u1";

    const switchTab = (tab) => setActiveTab(tab);

    return(
        <div>
            <ul className="nav nav-tabs">

                {/* Local Feed */}
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === "local" ? "active" : ""}`} 
                        onClick={() => switchTab("local")}>Local
                    </button>
                </li>

                {/* Global Feed */}
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === "global" ? "active" : ""}`} 
                        onClick={() => switchTab("global")}>Global
                    </button>
                </li>
            </ul>

            <section className="tab-content">
                <div className="tab-pane active">
                    {activeTab === "local" ? (
                        <ActivityList projects={projects} userId={currentUser} />
                    ) : (
                        <ActivityList projects={projects} />
                    )}
                </div>
            </section>
        </div>
    );
};