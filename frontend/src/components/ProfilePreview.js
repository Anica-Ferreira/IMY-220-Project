/* Anica Ferreira 40_u24581802 */
import React from "react";
import { Link } from "react-router-dom";

import { ProfileImage } from "./ProfileImage";

export const ProfilePreview = ({ profile, isLink = true }) =>{
    const currentUserId = sessionStorage.getItem("userId");

    return(
        <span className="profile-preview d-flex align-items-center">

            <ProfileImage profile={profile} size="small" />
            
            {isLink ? (
                <strong className="ms-2">
                    <Link to={`/profile/${profile._id}`}>
                        {" "}{profile.username} {currentUserId === profile._id && "(you)"}
                    </Link>
                </strong>
            ) : (
                <strong className="ms-2">
                    {" "}{profile.username} {currentUserId === profile._id && "(you)"}
                </strong>
            )}

        </span>
    );
};