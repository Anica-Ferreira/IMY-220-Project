/* Anica Ferreira 40_u24581802 */
import React from "react";
import { useState } from "react";
import { Files } from "./Files";
import { MemberList } from "./MemberList";
import { ProjectMessages } from "./ProjectMessages";
import { DiscussionBoard } from "../components/DiscussionBoard";

export const ProjectTabs = ({ project, isOwner, isMember, onUpdate }) =>{
    const [activeTab, setActiveTab] = useState('members');
    const switchTab = (tab) => setActiveTab(tab);

    return(
        <div className="layout-tabs">
            <ul className="nav nav-tabs mb-3 tab-links">
                {/* User Members Feed */}
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === "members" ? "active" : ""}`} 
                        onClick={() => switchTab("members")}><i className="fa-solid fa-users"></i> Members
                    </button>
                </li>
                {/* Files */}
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === "files" ? "active" : ""}`} 
                        onClick={() => switchTab("files")}><i className="fa-solid fa-folder-open"></i> Files
                    </button>
                </li>
                {/* Activity */}
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === "activity" ? "active" : ""}`} 
                        onClick={() => switchTab("activity")}><i className="fa-solid fa-chart-line"></i> Project Activity
                    </button>
                </li>
                {/* Discussion board */}
                {isMember && (
                    <li className="nav-item">
                        <button 
                            className={`nav-link ${activeTab === "board" ? "active" : ""}`} 
                            onClick={() => switchTab("board")}><i className="fa-solid fa-comments"></i> Discussion board
                        </button>
                    </li>
                )}
            </ul>
        
            {/* Tab Content */}
            <section className="tab-content card">
                {activeTab === "members" && (
                    <div> 
                        <MemberList project={project} isOwner={isOwner} isMember={isMember}/>
                    </div>
                )}

                {activeTab === "files" && (
                    <div> 
                        <Files project={project} isMember={isMember} onUpdate={onUpdate} />
                    </div>
                )}

                {activeTab === "activity" && (
                    <div> 
                        <ProjectMessages projectId={project._id} display="no-card"/>
                    </div>
                )}

                {activeTab === "board" && isMember && (
                    <div> 
                        <DiscussionBoard project={project} initialDiscussion={project.discussion}/>
                    </div>
                )}
            </section>
        </div>
    );
};