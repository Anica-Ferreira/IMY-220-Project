/* Anica Ferreira 40_u24581802 */
import React from "react";
import { Link } from "react-router-dom";

export const ProfilePreview = ({ profile, isLink = true }) =>{
    const currentUserId = sessionStorage.getItem("userId");

    return(
        <span className="profile-preview">
            <img src={profile.image} alt={`${profile.username} thumbnail image.`}/>
            {isLink ? (
                <strong>
                    <Link to={`/profile/${profile._id}`}>
                        {" "}{profile.username} {currentUserId === profile._id && "(you)"}
                    </Link>
                </strong>
            ) : (
                <strong>
                    {" "}{profile.username} {currentUserId === profile._id && "(you)"}
                </strong>
            )}

        </span>
    );
};