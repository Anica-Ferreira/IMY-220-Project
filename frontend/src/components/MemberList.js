/* Anica Ferreira u24581802 */
import React from "react";
import { ProfilePreview } from "./ProfilePreview";

//dummy data
import users from "../data/users.json"

export const MemberList = ({ project }) =>{
    
    //function stubs
    const handleRemove = () =>{};
    const handleAddMember = () =>{};
    const handleChangeOwner = () => {};

    return(
        <div>
            <h3>Project Members</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {/* Find members in project and find in users data */}
                    {project.members.map((memberId) => {
                        const user = users.find((u) => u.id === memberId);
                        
                        if (!user) return null;

                        return (
                            <li key={user.id}>
                                <ProfilePreview profile={user} />

                                {/* Assign Owner badge to project owner */}
                                {project.ownerId === user.id && (
                                    <span className="badge bg-primary ms-2">
                                        Owner
                                    </span>
                                )}

                                {/* Hardcoded for now, current user is u1, project owners can remove members */}
                                {(project.ownerId === "u1" && project.ownerId !== user.id) && (
                                    <button onClick={() => handleRemove(user.id)}>
                                        Remove
                                    </button>
                                )}
                            </li>
                        );
                    })}

                    <input type="text" placeholder="Add a member" />
                    <button onClick={() => handleAddMember()}>+</button>

                    {/* Hardcoded for now, current user is u1, project owners change ownership */}
                    {project.ownerId === "u1" && (
                        <button onClick={() => handleChangeOwner()}>
                            Change Owner
                        </button>
                    )}
                </ul>       
        </div>
    );
};