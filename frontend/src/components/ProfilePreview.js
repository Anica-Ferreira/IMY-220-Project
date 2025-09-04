/* Anica Ferreira u24581802 */
import React from "react";
import { Link } from "react-router-dom";

export const ProfilePreview = ({ profile }) =>{
    return(
        <>
            <img src={profile.image} alt={`${profile.name} thumbnail image.`} width={40}/>
            <strong> <Link to={`/profile/${profile.id}`}>{profile.name} </Link></strong>
        </>
    );
};