/* Anica Ferreira 40_u24581802 */
import React from "react";
import { ProjectPreview } from "./ProjectPreview";
import { ProfilePreview } from "./ProfilePreview";
import { Link } from "react-router-dom";

export const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const ms = now - date;

    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return "just now";
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} h ago`;
    if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (weeks < 4) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
    return `${years} year${years > 1 ? "s" : ""} ago`;
};

export const ActivityItem = ({ activity, showAll = true, showMessage = false }) =>{
    
    return(
        <div className="card mb-3">
            {showAll ? (
                <div>
                    {showMessage && <p>{activity.message}</p>}
                    <span>
                        <strong>
                            <Link to={`/profile/${activity.userId}`}>{activity.username}</Link>
                        </strong> {activity.action} a project:{" "}
                        {formatTimeAgo(activity.timestamp)}
                    </span>
                    <ProjectPreview
                        project={{
                            _id: activity.projectId,
                            name: activity.projectName,
                            image: activity.projectImage,
                            description: activity.projectDescription,
                            languages: activity.projectLanguages,
                            downloads: activity.downloads,
                            placeholder: activity.placeholder,
                            placeholderImages: activity.placeholderImages,
                            savedBy: activity.savedBy
                        }}
                    />
                </div>
            ) : (
                <div>
                    {showMessage && <p>{activity.message}</p>}
                    <span>
                        <ProfilePreview
                            profile={{
                                _id: activity.userId,
                                username: activity.username,
                                image: activity.userImage,
                                placeholder: activity.placeholder,
                                placeholderImages: activity.placeholderImages,
                                savedBy: activity.savedBy
                            }}
                        />
                        {activity.action}{' '}
                        <Link to={`/projects/${activity.projectId}`}>
                            {activity.projectName}
                        </Link>{' '}
                        {formatTimeAgo(activity.timestamp)}
                    </span>
                    
                </div>
            )}
        </div>
    );
};