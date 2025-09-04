/* Anica Ferreira u24581802 */
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { ProfileTabs } from "../components/ProfileTabs";
import { ProfileInfo } from "../components/ProfileInfo";
import {TagCloud } from "../components/TagCloud";

//dummy data
import  userData  from "../data/users.json";

export const Profile = () =>{
    //get profiletId
    const { profileId } = useParams();
    const profile = userData.find(p => p.id === profileId);
    
    const [currentProfile, setCurrentProfile] = useState(profile);

    //update profile when url changes
    useEffect(() => {
        const profile = userData.find(p => p.id === profileId);
        setCurrentProfile(profile);
    }, [profileId]);

    const handleSave = (updatedUser) => {
        setCurrentProfile(updatedUser);
    };

    return(
        <div>
            <Header isAuthenticated={true}/>
            <h1>Profile</h1>
            <div>
                <ProfileInfo user={currentProfile} onSave={handleSave} />
                <TagCloud />
            </div>
            <div>
                <ProfileTabs user={currentProfile}/>
            </div>
        </div>
    );
};