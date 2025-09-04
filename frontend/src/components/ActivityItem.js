/* Anica Ferreira u24581802 */
import React from "react";
import { ProjectPreview } from "./ProjectPreview";

import userData from "../data/users.json" 

export const ActivityItem = ({ activity, showAll = true }) =>{

    const user = userData.find((u) => u.id === activity.userId);
    console.log(user);

    return(  
        <div className="activity-item">
            {showAll ? (
                <div>
                    <span><strong>{activity.username}</strong> {activity.action} a project: {activity.date}</span>
                    <ProjectPreview project={activity.project} />
                </div>
            ) : (
                <div>
                    <img src={user.image} alt={user.username} width={40}/>
                    <span> <strong>{activity.username}</strong> {activity.action} {activity.project.name}: {activity.date}</span>
                    <p>{activity.message}</p>
                </div>
            )}
        </div>
    );
};