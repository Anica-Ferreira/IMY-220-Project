/* Anica Ferreira 40_u24581802 */
import React from "react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { formatTimeAgo } from "./ActivityItem";

export const DiscussionBoard = ({ project, initialDiscussion}) =>{
    const [discussion, setDiscussion] = useState(initialDiscussion || []);
    const [newMessage, setNewMessage] = useState("");
    const [users, setUsers] = useState({});
    const messagesRef = useRef(null);

    const sessionUserId = sessionStorage.getItem("userId");

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, [discussion]);

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    }, []);

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
        <div className="card discussion-card">

            {/* Check if messages exist */}
            {discussion.length === 0 && <p>No messages yet.</p>}

            <div className="discussion-messages" ref={messagesRef}>
                {discussion.map((message, index) => {
                    // Find user who sent the message
                    const user = users[message.userId];

                    return(
                        <div className="discussion-message" key={index}>
                            <div className="discussion-message-header">
                                <div className="user-info">
                                    <img src={user.image} alt={user.username} />
                                    <strong>
                                        <Link to={`/profile/${user._id}`}>{user.username}</Link>
                                    </strong>
                                </div>
                                <span>
                                    {formatTimeAgo(message.timestamp)}
                                </span>
                            </div>
                            <p>{message.message}</p>
                        </div >
                    );
                })}
                <div/>
            </div>

            <div className="discussion-input">
                <input type="text" placeholder="Write a message" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};