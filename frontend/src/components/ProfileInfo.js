/* Anica Ferreira 40_u24581802 */
import React from "react";
import { useState } from "react";
import { EditProfile } from "./EditProfile";

export const ProfileInfo = ({user, onSave}) =>{
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = (updatedUser) => {
        onSave(updatedUser);
        setIsEditing(false);
    }

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

                    {/* Harcoded for now since u1 us the logged in user */}
                    {user.id == "u1" ? (
                        <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                    ) : (
                        <button>Follow</button>
                    )}
                </>
            ) : (
                <EditProfile user={user} onSave={handleSave} onCancel={() => setIsEditing(false)} />
            )}
        </article>
    )
};