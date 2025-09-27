/* Anica Ferreira 40_u24581802 */
import React from "react";
import { ActivityItem } from "./ActivityItem";

export const ActivityList = ({ activities, showAll = true }) =>{
    return(  
        <div>
            {activities.map((activity, index) => (
                <ActivityItem key={index} activity={activity} showAll={showAll}/>
            ))}
        </div> 
    );
};