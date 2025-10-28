/* Anica Ferreira 40_u24581802 */
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ProfileTabs } from "../components/ProfileTabs";
import { ProfileInfo } from "../components/ProfileInfo";

export const Profile = () =>{
    const location = useLocation();
    const { profileId } = useParams();
    const [currentProfile, setCurrentProfile] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const sessionUserId = sessionStorage.getItem("userId");
    const params = new URLSearchParams(location.search);
    const isAdmin = params.get("adminManage") === "true";
    
    //update profile when url changes
    useEffect(() => {
        const fetchUser = async () =>{
            setLoading(true);
            setError("");
            try{
                //fetch user by id
                const res = await fetch(`/api/users/${profileId}`);
                const data = await res.json();
                if (!res.ok) {
                    setError(data.error_message);
                }
                setCurrentProfile(data);

                //fetch current logged-in user
                if (sessionUserId) {
                    const userRes = await fetch(`/api/users/${sessionUserId}`);
                    const userData = await userRes.json();
                    if (!userRes.ok) throw new Error(userData.error_message);
                    setCurrentUser(userData);
                }
            }catch (err){
                console.error(err);
            }finally{
                setLoading(false);
            }
        };
        //on page reload fetch new user
        fetchUser();
    }, [profileId]);

    const handleSave = (updatedUser) => {
        setCurrentProfile(updatedUser);
    };

    //If user not found yet, display loading
    if (loading) return <p>Loading profile...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    //check if you are viewing your own or another profile
    const isOwnProfile = sessionUserId === profileId;
    const isAdminManaging = isAdmin && !isOwnProfile; 

    const headerText = isAdminManaging ? "Manage Profile" : isOwnProfile? "Your Profile": "View Profile";

    return(
        <div>
            <h1 className="text-center">{headerText}</h1>
            <div className="profile-container">
                <div className="profile-info flex-1">
                    <ProfileInfo user={currentProfile} onSave={handleSave} viewOnly={isOwnProfile} currentUser={currentUser}/>
                </div>
                
                {isOwnProfile && (
                    <div className="profile-tabs">
                        <ProfileTabs user={currentProfile} viewOnly={isOwnProfile} />
                    </div>
                )}
            </div>
        </div>
    );
};