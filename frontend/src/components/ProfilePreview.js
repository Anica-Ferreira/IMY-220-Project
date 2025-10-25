/* Anica Ferreira 40_u24581802 */
import React from "react";
import { Link } from "react-router-dom";

import { ProfileImage } from "./ProfileImage";

export const ProfilePreview = ({ profile, isLink = true }) =>{
    const currentUserId = sessionStorage.getItem("userId");

    return(
        <span className="profile-preview">

            <ProfileImage profile={profile} />
            
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