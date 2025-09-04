/* Anica Ferreira u24581802 */
import React, { useState } from "react";

//dummy data, find user based on id in discussion
import userData from "../data/users.json";

export const DiscussionBoard = ({ discussion }) =>{
    const [newMessage, setNewMessage] = useState("");
    
    const handleSendMessage = () =>{}

    return (
        <div>
            <h2>Discussion Board</h2>

            {/* Check if messages exist */}
            {discussion.length === 0 && <p>No messages yet.</p>}

            <div>
                {discussion.map((message) =>{
                    {/* Find user who sent the message */}
                    const user = userData.find((u) => u.id === message.userId);

                    return(
                        <div>
                            <img src={user.image} alt={user.username} width={40}></img>
                            <strong> {user.username} </strong>
                            <span>{message.date}</span>
                            <p>{message.message}</p>
                        </div>
                    );
                })}
            </div>

            <input type="text" placeholder="Write a message" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
};