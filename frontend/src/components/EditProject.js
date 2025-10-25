/* Anica Ferreira 40_u24581802 */
import React from "react";
import { ProfilePreview } from "./ProfilePreview";
import { useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";

export const EditProject = ({ project, onSave, onCancel }) => {
    const [members, setMembers] = useState([]);
    const [formData, setFormData] = useState(project);
    const [selectedFile, setSelectedFile] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    
    const fileInputRef = useRef(null);
    const dropdownRef = useRef(null);
    
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

    //file drag and drop
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setSelectedFile(file);

        if (file) {
            setFormData({
                ...formData,
                image: URL.createObjectURL(file),
            });
        }
    };
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        multiple: false
    });

    if((project.members || []).length > 0 && members.length === 0){
        return;
    }

    //search for friends in list
    const filteredMembers = members.filter(u => u._id !== project.owner)
        .filter(u => u.username.toLowerCase().includes(searchTerm.toLowerCase()));

    //when member was selected in dropdown
    const handleSelect = (user) => {
        setSelectedUser(user);
        setSearchTerm(user.username);
        setDropdownVisible(false);
    };

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
        <form className="edit-project-form" onSubmit={handleSubmit}>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <img src={formData.image} alt={`${formData.name}'s image`} />
                <p>{isDragActive ? "Drop image here..." : "Drag & drop or click to select an image"}</p>
            </div>

            <div>
                <label htmlFor="name">Project Name</label>
                <input id="name" value={formData.name} onChange={handleChange} />
            </div><br/>

            <div>
                <label htmlFor="description">Description</label>
                <textarea id="description" value={formData.description} onChange={handleChange}></textarea>
            </div><br/>

            <label htmlFor="type">Project Type</label>
            <select id="type" name="type" value={formData.type} onChange={handleChange}>
                <option value="Desktop Application">Desktop Application</option>
                <option value="Web Application">Web Application</option>
                <option value="Mobile Application">Mobile Application</option>
                <option value="Framework">Framework</option>
                <option value="Library">Library</option>
            </select><br/>

            {/* Change Ownership */}
            <label>Change Ownership</label>
            <div className="dropdown" ref={dropdownRef}>
                <input
                    type="text"
                    className="dropdown-toggle"
                    placeholder="Change Ownership"
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
            </div><br/>
                                        
            <button type="submit" onClick={handleChangeOwner}>Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};