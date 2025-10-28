/* Anica Ferreira 40_u24581802 */
import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { EditProfile } from "./EditProfile";
import { useNavigate } from "react-router-dom";
import { ProfileImage } from "./ProfileImage";
import {PopupModel } from "./PopupModel"

export const ProfileInfo = ({user, onSave, viewOnly, currentUser}) =>{
    const navigate = useNavigate();
    const location = useLocation();
    const [isEditing, setIsEditing] = useState(false);
    const [isFriend, setIsFriend] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    
    const params = new URLSearchParams(location.search);
    const isAdmin = params.get("adminManage") === "true";
    
    //check if profile user is in current users friends list
    useEffect(() =>{
        if(!currentUser || !currentUser.friends || !user) return;

        if(currentUser.friends.some(friendId => friendId === user._id)) {
            setIsFriend(true);
        }else {
            setIsFriend(false);
        }
    }, [currentUser, user]);

    //UPDATE PROFILE
    const handleSave = async (updatedUser) => {
        setSaving(true);

        try{
            const res = await fetch(`/api/users/update/${user._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: updatedUser.name,
                    image: updatedUser.image,
                    role: updatedUser.role,
                    about: updatedUser.about,
                    company: updatedUser.company,
                }),
            });

            if(res.ok){
                const updatedUser = await res.json();
                onSave(updatedUser.user);
                setIsEditing(false);
            }
        }catch(err){
            console.error(err);
        }finally{
            setSaving(false);
        }
    };

    //FRIEND AND UNFRIEND
    const handleToggleFollow = async () =>{
        if(!currentUser) return;
        setLoading(true);

        try {
            const endpoint = isFriend ? "/api/users/removeFriend" : "/api/users/addFriend";
            const res = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: currentUser._id,
                    friendId: user._id,
                }),
            });

            if (res.ok) {
                setIsFriend(!isFriend);
            }else {
                console.error("Failed to update friends");
            }
        }catch (err){
            console.error(err);
        }finally {
            setLoading(false);
        }
    };

    //DELETE PROFILE
    const handleDeleteAccount = async () => {
        if(!user) return;
        setDeleting(true);

        try{
            const res = await fetch(`/api/users/delete/${user._id}`, {
                method: "DELETE",
            });
        
            if(res.ok){
                if(isAdmin){
                    navigate("/admin");
                }else{
                    sessionStorage.removeItem("userId");
                    sessionStorage.setItem("isAuthenticated", false);
                    window.dispatchEvent(new Event("authChange")); //set header
                    navigate("/admin");
                }
            }

        }catch(err){
            console.error(err);
        }finally {
            setDeleting(false);
        }
    };

    //popup message
    const message = isAdmin ? "Are you sure you want to delete this user?": "Are you sure you want to delete your profile?";

    return(
        <article className="profile-info shadow-sm">
            {!isEditing ? (
                <>
                    <ProfileImage profile={user} size="large"/>

                    <h2>{user.name}</h2>
                    <h3>@{user.username}</h3>

                    <p>{user.about}</p>
                    <strong>{user.role}</strong><br/>
                    <strong>{user.email}</strong><br/>
                    <strong>{user.company}</strong><br/><br/>

                    {viewOnly || isAdmin ? (
                        <>
                            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                            <button  onClick={() => setShowDeletePopup(true)} disabled={deleting}>{deleting ? "Deleting..." : "Delete Account"}</button>
                        </>
                        
                    ) : (
                        <button onClick={handleToggleFollow} disabled={loading}>
                            {loading ? "..." : isFriend ? "Unfollow" : "Follow"}
                        </button>
                    )}
                </>
            ) : (
                <EditProfile user={user} onSave={handleSave} onCancel={() => setIsEditing(false)} />
            )}

            {/* DeletePopup */}
            <PopupModel
                visible={showDeletePopup}
                title="Confirm Delete"
                message={message}
                isConfirmation={true}
                onConfirm={async () => {
                    setShowDeletePopup(false);
                    await handleDeleteAccount();
                }}
                onCancel={() => setShowDeletePopup(false)}
            />
        </article>
    )
};