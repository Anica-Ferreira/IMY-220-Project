/* Anica Ferreira 40_u24581802 */
import React from "react";

import { useState } from "react";
import { ActivityList } from "./ActivityList";
import { Sort } from "./Sort";

export const Feed = ({ localActivity, globalActivity, sortOption, setSortOption }) => {
    const [activeTab, setActiveTab] = useState('local');

    const switchTab = (tab) => setActiveTab(tab);

    return(
        <div>
            <div className="feed-header d-flex align-items-center mb-3">
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
                <Sort sortOption={sortOption} setSortOption={setSortOption} />
            </div>

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