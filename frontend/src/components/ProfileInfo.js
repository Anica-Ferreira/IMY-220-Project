/* Anica Ferreira 40_u24581802 */
import React from "react";
import { useState, useEffect } from "react";
import { EditProfile } from "./EditProfile";
import { useNavigate } from "react-router-dom";

export const ProfileInfo = ({user, onSave, viewOnly, currentUser}) =>{
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [isFriend, setIsFriend] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    //check if profile user is in current users friends list
    useEffect(() =>{
        if (!currentUser || !currentUser.friends || !user) return;

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
                sessionStorage.removeItem("userId");
                sessionStorage.setItem("isAuthenticated", false);
                window.dispatchEvent(new Event("authChange")); //set header
                navigate("/");
            }

        }catch(err){
            console.error(err);
        }finally {
            setDeleting(false);
        }
    };

    return(
        <article className="profile-info shadow-sm">
            {!isEditing ? (
                <>
                    <img src={user.image} alt={`${user.username}'s profile picture`} width={120}/>

                    <h2>{user.name}</h2>
                    <h3>@{user.username}</h3>

                    <p>{user.about}</p>
                    <strong>{user.role}</strong><br/>
                    <strong>{user.email}</strong><br/>
                    <strong>{user.company}</strong><br/><br/>

                    {viewOnly ? (
                        <>
                            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                            <button  onClick={handleDeleteAccount} disabled={deleting}>{deleting ? "Deleting..." : "Delete Account"}</button>
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
        </article>
    )
};