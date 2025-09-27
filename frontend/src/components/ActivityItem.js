/* Anica Ferreira 40_u24581802 */
import React from "react";
import { ProjectPreview } from "./ProjectPreview";

export const ActivityItem = ({ activity, showAll = true }) =>{
    return(
        <div className="card mb-3">
            {showAll ? (
                <div>
                    <span>
                        <strong>{activity.username}</strong> {activity.action} a project:{" "}
                        {new Date(activity.timestamp).toLocaleDateString()}
                    </span>
                    <ProjectPreview
                        project={{
                            _id: activity.projectId,
                            name: activity.projectName,
                            image: activity.projectImage,
                            description: activity.projectDescription,
                            languages: activity.projectLanguages
                        }}
                    />
                </div>
            ) : (
                <div>
                    <span>
                        <strong>{activity.username}</strong> {activity.action} {activity.projectName}:{" "}
                        {new Date(activity.timestamp).toLocaleDateString()}
                    </span>
                    <p>{activity.message}</p>
                </div>
            )}
        </div>
    );
};