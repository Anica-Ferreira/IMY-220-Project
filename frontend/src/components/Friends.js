/* Anica Ferreira u24581802 */
import React from "react";
import { ProfilePreview } from "./ProfilePreview";

//dummy data
import users from "../data/users.json";

export const Friends = ({ user, onRemoveFriend }) =>{
    //find friends from user id
    const friendsList = user.friends
        .map(friendId => users.find(u => u.id === friendId))

    return(
        <div>
            {friendsList.length === 0 && <p>No friends yet.</p>}
            {friendsList.map((friend) => (
                <div key={friend.id}>
                    <ProfilePreview profile={friend} />
                    <button onClick={() => onRemoveFriend(friend.id)}>
                        Remove Friend
                    </button>
                </div>
            ))}
        </div>
    )
};