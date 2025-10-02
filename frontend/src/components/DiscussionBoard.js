/* Anica Ferreira 40_u24581802 */
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const DiscussionBoard = ({ project, initialDiscussion}) =>{
    const [discussion, setDiscussion] = useState(initialDiscussion || []);
    const [newMessage, setNewMessage] = useState("");
    const [users, setUsers] = useState({});

    const sessionUserId = sessionStorage.getItem("userId");

    useEffect(() => {
        const fetchUsers = async () => {
            try{
                const res = await fetch("/api/users");
                const usersArray = await res.json();
                const usersMap = {};
                usersArray.forEach(u => (usersMap[u._id] = u));
                setUsers(usersMap);
            }catch (err) {
                console.error(err);
            }
        };
        fetchUsers();
    }, []);

    if (discussion.length > 0 && Object.keys(users).length === 0) {
    return <p>Loading users...</p>;}

    //Add discussion message
    const handleSendMessage = async () =>{
        //check if message is empty
        if (!newMessage.trim()) return;

        try{
            const res = await fetch(`/api/projects/discussion/${project._id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    userId: sessionUserId,
                    message: newMessage 
                })
            });

            const data = await res.json();

            setDiscussion(prev => [...prev, data.discussionMessage]);
            setNewMessage("");
        }catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <h2>Discussion Board</h2>

            {/* Check if messages exist */}
            {discussion.length === 0 && <p>No messages yet.</p>}

            <div>
                {discussion.map((message, index) => {
                    // Find user who sent the message
                    const user = users[message.userId];

                    return(
                        <div key={index}>
                            <img src={user.image} alt={user.username} width={40}></img>
                            <strong>
                                <Link to={`/profile/${user._id}`}>{user.username}</Link>
                            </strong>
                            <span>{new Date(message.timestamp).toLocaleString()}</span>
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