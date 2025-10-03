/* Anica Ferreira 40_u24581802 */
import React from "react";
import { useState, useEffect, useRef } from "react";
import { ProfilePreview } from "./ProfilePreview";

export const MemberList = ({ project, isOwner, isMember }) =>{
    const [members, setMembers] = useState([]);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const dropdownRef = useRef(null);
    const sessionUserId = sessionStorage.getItem("userId");

    useEffect(() => {
        const fetchUsers = async () => {
            try{
                const res = await fetch("/api/users");
                const users = await res.json();
                setUsers(users);

                const projectMembers = users.filter(user =>
                    (project.members || []).includes(user._id)
                );
                setMembers(projectMembers);
            }catch (err) {
                console.error(err);
            }
        };
        fetchUsers();
    }, [project]);

    //event listener to hide dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) =>{
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>{
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if((project.members || []).length > 0 && members.length === 0){
        return <p>Loading members...</p>;
    }

    //get current user info
    const currentUser = users.find(u => u._id === sessionUserId);

    //get friends fot current user who are not already members
    const friendsNotMembers = users.filter(u => currentUser.friends.includes(u._id) && !members.some(m => m._id === u._id));

    //search for friends in list
    const filteredFriends = friendsNotMembers.filter(u =>
        u.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    //when member was selected in dropdown
    const handleSelect = (user) => {
        setSelectedUser(user);
        setSearchTerm(user.username);
        setDropdownVisible(false);
    };

    const handleAddMember = async () =>{
        //check if member was selected
        if (!selectedUser) return;

        //Add new member to databse
        try{
            const res = await fetch(`/api/projects/add-member/${project._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: selectedUser._id }),
            });

            setMembers(prev => [...prev, selectedUser]);
            setSelectedUser(null);
            setSearchTerm("");
        }catch(err){
            console.error(err);
        }
    };

    //function stubs
    const handleRemove = async (userId) =>{

        //Remove member from database
        try{
            const res = await fetch(`/api/projects/remove-member/${project._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId }),
            });

            setMembers(prev => prev.filter(m => m._id !== userId));
        }catch(err){
            console.error(err);
        }
    };

    return(
        <div className="members-card card">
            <ul>
                {members.map((user) => (
                    <li key={user._id} className="member-item">
                        <ProfilePreview profile={user} />

                        {/* Owner badge */}
                        {project.owner === user._id && (
                            <span className="badge">
                                Owner
                            </span>
                        )}

                        {/* Only the current owner can remove others */}
                        {isOwner && project.owner !== user._id && (
                            <button onClick={() => handleRemove(user._id)}>
                                Remove
                            </button>
                        )}
                    </li>
                ))}

                {/* Only members can can add new members */}
                    {isMember && (
                        <li className="mt-2">
                            <div className="add-member dropdown" ref={dropdownRef}>
                                <input
                                    type="text"
                                    className="dropdown-toggle"
                                    placeholder="Add a member"
                                    onClick={() => setDropdownVisible(true)}
                                    value={selectedUser ? selectedUser.username : searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setSelectedUser(null);
                                        setDropdownVisible(true);
                                    }}
                                />

                                {/*Dispay current user's friends who are not members*/}
                                <div className={`dropdown-menu ${dropdownVisible ? "show" : ""} overflow-auto`}>
                                   {filteredFriends.length > 0 ? (
                                        filteredFriends.map((friend) => (
                                            <div
                                                key={friend._id}
                                                className="dropdown-item"
                                                onClick={() => handleSelect(friend)}
                                            >
                                                <ProfilePreview profile={friend} isLink={false} />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="dropdown-item text-muted">
                                            No friends available to add
                                        </div>
                                    )}
                                </div>
                                <button onClick={handleAddMember}>+</button>
                            </div>
                        </li>
                    )}
            </ul>
        </div>
    );
};