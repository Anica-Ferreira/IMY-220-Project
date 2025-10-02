/* Anica Ferreira 40_u24581802 */
import React from "react";
import { ProfilePreview } from "./ProfilePreview";
import { useState, useRef, useEffect } from "react";

export const EditProject = ({ project, onSave, onCancel }) => {
    const [members, setMembers] = useState([]);
    const [formData, setFormData] = useState(project);
    const [selectedFile, setSelectedFile] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const fileInputRef = useRef(null);

    const sessionUserId = sessionStorage.getItem("userId");
    
    useEffect(() => {
        const fetchUsers = async () => {
            try{
                const res = await fetch("/api/users");
                const users = await res.json();

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
    
    if((project.members || []).length > 0 && members.length === 0){
        return;
    }

    //search for friends in list
    const filteredMembers = members.filter(u => u._id !== project.owner)
        .filter(u => u.username.toLowerCase().includes(searchTerm.toLowerCase()));

    //trigger hidden file input when pencil icon is clicked
    const handleFileClick = () =>{
        fileInputRef.current.click();
    };

    //when member was selected in dropdown
    const handleSelect = (user) => {
        setSelectedUser(user);
        setSearchTerm(user.username);
        setDropdownVisible(false);
    };

    const handleFileChange = (e) =>{
        setSelectedFile(e.target.files[0]);
        const file = e.target.files[0];
        
        //preview image
        if (file) {
            setFormData({
                ...formData,
                image: URL.createObjectURL(file),
            });
        }
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        //handle saving image
        e.preventDefault();
        let updatedImagePath = formData.image;

        //check if image was changed
        if (selectedFile) {
            try{
                const formDataObj = new FormData();
                formDataObj.append("projectId", project._id);
                formDataObj.append("file", selectedFile);
                
                const res = await fetch("/api/images/upload/project", {
                    method: "POST",
                    body: formDataObj,
                });

                const data = await res.json();
                //get returned image
                updatedImagePath = data.path;
                
            }catch(err){
                console.error;
                return;
            }
        }

        onSave({ ...project, ...formData, image: updatedImagePath });
    };

    const handleChangeOwner = async () => {
        //check if member was selected
        if (!selectedUser) return;

        setSelectedUser(null);
        setSearchTerm("");

        //Add new ownder to databse
        try{
            const res = await fetch(`/api/projects/update/${project._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    owner: selectedUser._id,
                }),
            });
        }catch(err){
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <img src={formData.image} alt={`${formData.name}'s profile`} width={120} onClick={handleFileClick}/>

            <input type="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*" onChange={handleFileChange}/>
            <i className="fas far fa-edit" onClick={handleFileClick}></i>

            <div>
                <label htmlFor="name">Project Name</label>
                <input id="name" value={formData.name} onChange={handleChange} />
            </div>

            <div>
                <label htmlFor="description">Description</label>
                <textarea id="description" value={formData.description} onChange={handleChange}></textarea>
            </div>

            <label htmlFor="type">Project Type</label>
            <select id="type" name="type" value={formData.type} onChange={handleChange}>
                <option value="Desktop Application">Desktop Application</option>
                <option value="Web Application">Web Application</option>
                <option value="Mobile Application">Mobile Application</option>
                <option value="Framework">Framework</option>
                <option value="Library">Library</option>
            </select>

            {/* Change Ownership */}
            <div className="dropdown">
                <input
                    type="text"
                    className="dropdown-toggle"
                    placeholder="Change OwnerShip"
                    onClick={() => setDropdownVisible(true)}
                    value={selectedUser ? selectedUser.username : searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setSelectedUser(null);
                        setDropdownVisible(true);
                    }}
                />

                {/*Dispay all project member except owner*/}
                <div className={`dropdown-menu ${dropdownVisible ? "show" : ""} overflow-auto`}>
                    {filteredMembers.map((friend) => (
                        <div key={friend._id} className="dropdown-item" onClick={() => handleSelect(friend)}>
                            <ProfilePreview profile={friend} isLink={false} />
                        </div>
                    ))}
                </div>
            </div>
                                        
            <button type="submit" onClick={handleChangeOwner}>Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};