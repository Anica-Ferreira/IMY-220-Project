/* Anica Ferreira 40_u24581802 */
import React from "react";
import { ProjectPreview } from "./ProjectPreview";
import { Link } from "react-router-dom";

export const ActivityItem = ({ activity, showAll = true }) =>{
    return(
        <div className="card mb-3">
            {showAll ? (
                <div>
                    <span>
                        <strong>
                            <Link to={`/profile/${activity.userId}`}>{activity.username}</Link>
                        </strong> {activity.action} a project:{" "}
                        {new Date(activity.timestamp).toLocaleDateString()}
                    </span>
                    <ProjectPreview
                        project={{
                            _id: activity.projectId,
                            name: activity.projectName,
                            image: activity.projectImage,
                            description: activity.projectDescription,
                            languages: activity.projectLanguages,
                            downloads: activity.downloads
                        }}
                    />
                </div>
            ) : (
                <div>
                    <span>
                        <strong>
                            <Link to={`/profile/${activity.userId}`}>{activity.username}{" "}</Link>
                        </strong>
                        {activity.action}{" "}  
                        <Link to={`/projects/${activity.projectId}`}>{activity.projectName}</Link>
                        :{" "}{new Date(activity.timestamp).toLocaleDateString()}
                    </span>
                    <p>{activity.message}</p>
                </div>
            )}
        </div>
    );
};