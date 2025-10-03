/* Anica Ferreira 40_u24581802 */
import React from "react";
import { useState, useRef } from "react";

export const EditProfile = ({ user, onSave, onCancel }) => {
    const [formData, setFormData] = useState(user);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    //trigger hidden file input when pencil icon is clicked
    const handleFileClick = () =>{
        fileInputRef.current.click();
    }

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
                formDataObj.append("userId", user._id);
                formDataObj.append("file", selectedFile);
                
                const res = await fetch("/api/images/upload/profile", {
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

        onSave({ ...formData, image: updatedImagePath });
    };

    return (
        <form className="edit-project-form" onSubmit={handleSubmit}>
            <img src={formData.image} alt={`${formData.username}'s profile`}  width={120} onClick={handleFileClick}/>

            <input type="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*" onChange={handleFileChange}/>
            <i className="fas far fa-edit" onClick={handleFileClick}></i>

            <div>
                <label htmlFor="name">Full Name</label>
                <input id="name" value={formData.name} onChange={handleChange} />
            </div>

            <div>
                <label htmlFor="about">About</label>
                <textarea id="about" value={formData.about} onChange={handleChange}></textarea>
            </div>

            <div>
                <label htmlFor="role">Role</label>
                <input id="role" value={formData.role} onChange={handleChange} />
            </div>

            <div>
                <label htmlFor="company">Company</label>
                <input id="company" value={formData.company} onChange={handleChange} />
            </div>

            <button type="submit" className="mt-3">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};