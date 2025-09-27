/* Anica Ferreira 40_u24581802 */
import React from "react";

import { useState } from "react";
import { ActivityList } from "./ActivityList";

export const Feed = ({ localActivity, globalActivity  }) => {
    const [activeTab, setActiveTab] = useState('local');

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
                        <ActivityList activities={localActivity}/>
                    ) : (
                        <ActivityList activities={globalActivity} />
                    )}
                </div>
            </section>
        </div>
    );
};