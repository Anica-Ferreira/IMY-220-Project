/* Anica Ferreira 40_u24581802 */
import React, { useEffect } from "react";
import { useState } from "react";
import { EditProfile } from "./EditProfile";

export const ProfileInfo = ({user, onSave, viewOnly, currentUser}) =>{
    const [isEditing, setIsEditing] = useState(false);
    const [isFriend, setIsFriend] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    //check if profile user is in current users friends list
    useEffect(() =>{
        if (!currentUser || !currentUser.friends || !user) return;

        if(currentUser.friends.some(friendId => friendId === user._id)) {
            setIsFriend(true);
        }else {
            setIsFriend(false);
        }
    }, [currentUser, user]);

    //Save new user profile
    const handleSave = async (updatedUser) => {
        setSaving(true);

        try{
            const res = await fetch(`/users/update/${user._id}`, {
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

    const handleToggleFollow = async () =>{
        if(!currentUser) return;
        setLoading(true);

        try {
            const endpoint = isFriend ? "/users/removeFriend" : "/users/addFriend";
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

    return(
        <article >
            {!isEditing ? (
                <>
                    <img src={user.image} alt={`${user.username}'s profile picture.`} width={120}/>
                    <h2>{user.name}</h2>
                    <h3>@{user.username}</h3>

                    <p>{user.about}</p>
                    <strong>{user.role}</strong><br/>
                    <strong>{user.email}</strong><br/>
                    <strong>{user.company}</strong><br/><br/>

                    {viewOnly ? (
                        <button onClick={() => setIsEditing(true)}>Edit Profile</button>
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