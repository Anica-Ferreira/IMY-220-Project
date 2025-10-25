/* Anica Ferreira 40_u24581802 */
import React from "react";
import { ActivityItem } from "./ActivityItem";

export const ActivityList = ({ activities, showAll = true, showMessage, type="eed" }) =>{
    
    const emptyErrorMessage = () =>{
        if (type === "feed") {
            return (
                <div className="p-4">
                    <h5>You have no activity yet!</h5>
                    <p className="text-muted">
                        This is where all your local activity for projects that you are a member of will appear.
                    </p>
                </div>
            );
        }else if (type === "profile") {
            return (
                <div className="card">
                    <p>You have no activity yet.</p>
                </div>
            );
        }
    }
    
    return(  
        <div>
            {activities.length === 0 ? (
                emptyErrorMessage()
            ) : (
                activities.map((activity, index) => (
                    <ActivityItem key={index} activity={activity} showAll={showAll}showMessage={showMessage}/>
                ))
            )}
        </div>
    );
};