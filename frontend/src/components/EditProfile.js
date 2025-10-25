/* Anica Ferreira 40_u24581802 */
import React from "react";
import { useState, useRef } from "react";
import { ProfileImage } from "./ProfileImage";
import { useDropzone } from "react-dropzone";

export const EditProfile = ({ user, onSave, onCancel }) => {
    const [formData, setFormData] = useState(user);
    const [selectedFile, setSelectedFile] = useState(null);

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

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        //handle saving image
        e.preventDefault();
        let updatedImagePath = formData.image;
        let updatedFields = { ...formData };

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
                updatedFields.placeholder = false;
            }catch(err){
                console.error;
                return;
            }
        }

        onSave({ ...formData, image: updatedImagePath });
    };

    return (
        <form className="edit-project-form" onSubmit={handleSubmit}>
            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                <ProfileImage profile={formData} size="large" preview={!!selectedFile} />
                <p>{isDragActive ? "Drop image here..." : "Drag & drop or click to select an image"}</p>
            </div>

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