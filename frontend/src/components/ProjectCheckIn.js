/* Anica Ferreira 40_u24581802 */
import { file } from "jszip";
import React from "react";
import { useState, useRef } from "react";
import { useDropzone } from "react-dropzone";

export const ProjectCheckIn = ({project, onClose, onCheckIn}) =>{
    const currentUserId = sessionStorage.getItem("userId");
    const [files, setFiles] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    
    const getNextVersion = (version) =>{
        const parts = (version || "0.0.0").split(".").map(Number);
        parts[1] += 1;
        if (parts[1] > 9) {
            parts[0] += 1;
            parts[1] = 0;
        }
        parts[2] = 0;
        return parts.join(".");
    }

    const nextVersion = getNextVersion(project.version);

    //Form Data
    const [formData, setFormData] = useState({
        message: "",
        version: nextVersion,
    });
    
    const fileInputRef = useRef(null);

    //FILES

    //Adding selected file
    const onFilesDrop = (acceptedFiles) => {
        const filteredFiles = acceptedFiles.filter(
            file => !files.some(f => f.name === file.name && f.size === file.size)
        );
        if (filteredFiles.length > 0) setFiles(prev => [...prev, ...filteredFiles]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onFilesDrop,
        multiple: true,
    });

    //Remove a file from added list
    const handleRemoveFile = (removeIndex) => {
        const newFiles = files.filter((file, index) => {
            return index !== removeIndex;
        });

        setFiles(newFiles);
    };

    //FORM CHANGE
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    //VALIDATION
    const validateForm = () => {
        const newErrors = {};

        //message
        if (!formData.message.trim()){
            newErrors.message = "Please enter a check in message.";
        } 

        if (!formData.version.trim()){
            newErrors.version = "Please enter a version number.";
        }else {
            const versionPattern = /^\d+\.\d+\.\d+$/;
            if(!versionPattern.test(formData.version)){
                newErrors.version = "Version must be in the format x.y.z.";
            }
        }

        //files
        if (!files || files.length === 0){
            newErrors.files = "At least one project file must be added.";
        }

        return newErrors;
    };

    //FORM SUBMISSION
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formErrors = validateForm();
        setErrors(formErrors);

        //check if errors occured
        if(Object.keys(formErrors).length !== 0) return;
        
        setLoading(true);
        try {
            const res = await fetch('/api/activities/checkin', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    projectId: project._id,
                    userId: currentUserId,
                    version: formData.version,
                    message: formData.message
                }),
            });

            if (!res.ok) throw new Error("Failed to check in project");

            const data = await res.json();
            setCheckedOutBy(currentUserId);

            //download files after successful check in
            await downloadAllFiles();

        }catch(err){
            console.error("Error checking in project:", err);
        }

        //UPLOAD PROJECT FILES
        const formDataFiles = new FormData();
        formDataFiles.append("projectId", project._id);
        formDataFiles.append("projectName", project.name);
        files.forEach(file => {
            formDataFiles.append("files", file, file.name);
        });

        const uploadRes = await fetch("/api/files/upload", {
            method: "POST",
            body: formDataFiles,
        });

        const uploadData = await uploadRes.json();
        if (uploadRes.ok && uploadData.files) {
            const uploadedFiles = uploadData.files.map(f => ({
                name: f.filename,
                path: f.path,
                size: f.size,
            }));

            await fetch(`/api/projects/update/${project._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ files: uploadedFiles }),
            });
        }

        onCheckIn(files);

    };

    return(
        <div className="card edit-project-form create">
            <form>

                <div className="form-group">
                    <label htmlFor="message">Check in Message</label>
                    <input id="message" name="name" type="text" onChange={handleChange}/>
                    {errors.message && <small className="text-danger">{errors.message}</small>}
                </div>

                <div className="form-group">
                    <label htmlFor="version">Version</label>
                    <input id="version" name="version" type="text" defaultValue={nextVersion} onChange={handleChange}/>
                    {errors.version && <small className="text-danger">{errors.version}</small>}
                </div>
                
                <div className="form-group">
                    <label>Project Files</label>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>{isDragActive ? "Drop files here..." : "Click or drag files here"}</p>
                    </div>

                    {/* Display selected files */}
                    {files.length > 0 && (
                        <ul>
                        {files.map((file, idx) => (
                            <li key={idx}>
                            {file.name} ({Math.round(file.size / 1024)} KB)
                            <button type="button" onClick={() => handleRemoveFile(idx)} className="remove-btn">
                                Remove
                            </button>
                            </li>
                        ))}
                        </ul>
                    )}
                </div><br/>

                <button type="submit" onClick={handleSubmit} disabled={loading}>Check In</button>
                <button type="button" onClick={onClose}>Cancel</button>
                
                
            </form>
        </div>
    )
};