/* Anica Ferreira u24581802 */
import React from "react";
import { ActivityItem } from "./ActivityItem";

export const ActivityList = ({ projects, userId = null, onlyUserActivity = false, showAll = true }) =>{
    //flatten activity and add project
    let allActivity = projects.flatMap((project) =>
        project.activity.map((act) => ({ ...act, project }))
    );
    
    //check if userId was included and filter
    if (userId) {
        {/* If onlyUserActivity was selected, show only activities done by this user, for profile page */}
        if (onlyUserActivity) {
            allActivity = allActivity.filter((act) => act.userId === userId);
        }else{
            {/* Otherwise display all activity of the projects the user is part of */}
            allActivity = allActivity.filter((act) =>
                act.project.members.includes(userId)
            );
        }
    }
    
    //sort activity in reverse chronological order
    const sortedActivity = [...allActivity].sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );

    return(  
        <div>
            {sortedActivity.map((item) => (
                <ActivityItem key={item.id} activity={item} showAll={showAll}/>
            ))}
        </div> 
    );
};