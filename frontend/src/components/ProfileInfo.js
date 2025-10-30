/* Anica Ferreira 40_u24581802 */
import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { EditProfile } from "./EditProfile";
import { useNavigate } from "react-router-dom";
import { ProfileImage } from "./ProfileImage";
import {PopupModel } from "./PopupModel"

export const ProfileInfo = ({user, onSave, viewOnly, currentUser, isFriend}) =>{
    const navigate = useNavigate();
    const location = useLocation();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [friend, setFriend] = useState(isFriend);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    
    const params = new URLSearchParams(location.search);
    const isAdmin = params.get("adminManage") === "true";

    useEffect(() => {
        setFriend(isFriend);
    }, [isFriend]);

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
            const endpoint = friend ? "/api/users/removeFriend" : "/api/users/addFriend";
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
                setFriend(!isFriend);
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
                if(user.roleType){
                    navigate("/admin");
                }else{
                    sessionStorage.clear;
                    window.dispatchEvent(new Event("authChange"));
                    navigate("/");
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
        <article className="info-layout card shadow-sm">
            {!isEditing ? (
                <>  
                    <div className="img-layout">
                        <h2>{user.name}</h2>
                        <ProfileImage profile={user} size="large"/>
                    </div>
                    
                    <div className="layout-center">
                        <h3>@{user.username}</h3>
                        <p>{user.about}</p>
                    </div>
                    
                    {/* Only visible to friends account holder and admin  */}
                    {(currentUser?._id === user._id || isFriend || isAdmin) && (
                        <div className="layout-details">
                            <hr/>
                            {user.role && <p><i className="fas fa-briefcase me-2"></i>{user.role}</p>}
                            {user.email && <p><i className="fas fa-envelope me-2"></i>{user.email}</p>}
                            {user.company &&<p><i className="fas fa-building me-2"></i>{user.company}</p>}
                        </div>
                    )}

                    {viewOnly || isAdmin ? (
                        <div className="layout-actions">
                            <span  onClick={() => setShowDeletePopup(true)} disabled={deleting}><i className="fas fa-trash"></i></span>
                            <span onClick={() => setIsEditing(true)}><i className="fas fa-edit"></i></span>
                        </div>
                        
                    ) : (
                        <button className="btn btn-red btn-sm mt-3" onClick={handleToggleFollow} disabled={loading}>
                            {loading ? "..." : friend ? "Unfollow" : "Follow"}
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