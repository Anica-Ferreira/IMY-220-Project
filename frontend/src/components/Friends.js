/* Anica Ferreira 40_u24581802 */
import React from "react";
import { useState, useEffect } from "react";
import { ProfilePreview } from "./ProfilePreview";

export const Friends = ({ friends: initialFriends, currentUser, viewOnly }) =>{
    const [friends, setFriends] = useState(initialFriends);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setFriends(initialFriends);
    }, [initialFriends]);

    const handleRemove = async (friendId) =>{
        if(!currentUser) return;
        setLoading(true);

        try {
            const res = await fetch("/api/users/removeFriend", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: currentUser._id,
                    friendId: friendId,
                }),
            });

            if(res.ok) {
                setFriends((prevFriends) => prevFriends.filter(f => f._id !== friendId));
            }

        }catch (err){
            console.error(err);
        }finally {
            setLoading(false);
        }
    };

    return(
        <div className="card">
            {friends.length === 0 && <p>No friends yet.</p>}
            {friends.map((friend) => (
                <div key={friend._id} className="friend-item">
                    <ProfilePreview profile={friend} />
                    {viewOnly && (
                        <button onClick={() => handleRemove(friend._id)} disabled={loading}>
                            {loading ? "..." : "Remove"}
                        </button>
                    )}
                </div>
            ))}
        </div>
    )
};