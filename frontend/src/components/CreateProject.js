/* Anica Ferreira 40_u24581802 */
import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";

export const CreateProject = ({onClose}) =>{
    const navigate = useNavigate();
    const [currentTag, setCurrentTag] = useState("");
    const [hashtags, setHashtags] = useState([]);
    const [errors, setErrors] = useState({});
    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);
    
    //Form Data
    const [formData, setFormData] = useState({
        image: "/assets/images/project.png",
        name: "",
        description: "",
        type: "Desktop Application",
    });

    //IMAGE DROP
    const onImageDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
            if (file) {
            setSelectedImageFile(file);
            setFormData(prev => ({ ...prev, image: URL.createObjectURL(file) }));
        }
    };

    const { getRootProps: getImageRootProps, getInputProps: getImageInputProps, isDragActive: isImageDragActive } =
        useDropzone({ onDrop: onImageDrop, accept: { "image/*": [] }, multiple: false });

    //HASHTAGS

    //Adding hashtag
    const handleAddHashtag = () => {
        const trimmedTag = currentTag.trim();
        if (!trimmedTag) return;

        //check for duplicates
        if (!hashtags.includes(trimmedTag)) {
            setHashtags([...hashtags, trimmedTag]);
        }

        setCurrentTag("");
    };

    //Remove a hashtag from added list
    const handleRemoveHashtag = (removeIndex) => {
        const newTags = hashtags.filter((tag, index) => {
            return index !== removeIndex;
        });
        setHashtags(newTags);
    };

    //FILES
    const {
        getRootProps: getFilesRootProps,
        getInputProps: getFilesInputProps,
        isDragActive: isFilesDragActive,
    } = useDropzone({
        onDrop: (acceptedFiles) => {
            const filteredFiles = acceptedFiles.filter(
                (file) => !files.some(f => f.name === file.name && f.size === file.size)
            );
            if (filteredFiles.length > 0) {
                setFiles(prev => [...prev, ...filteredFiles]);
            }
        },
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

        //name
        if (!formData.name.trim()){
            newErrors.name = "Project name cannot be empty.";
        } 

        //image
        if (selectedImageFile && selectedImageFile.size > 5 * 1024 * 1024){
            newErrors.image = "Image must be less than 5MB.";
        }

        //files
        if (!files || files.length === 0){
            newErrors.files = "At least one project file must be added.";
        }

        //hashtags
        if (hashtags.length === 0){
            newErrors.hashtags = "Add at least one hashtag.";
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
        try{
            const ownerId = sessionStorage.getItem("userId");

            //CREATE PROJECT
            const createRes = await fetch("/api/projects/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    description: formData.description,
                    type: formData.type,
                    version: "1.0.0",
                    hashtags: hashtags,
                    files: [], // empty for now
                    image: "/assets/images/project.png",
                    owner: ownerId,
                }),
            });

            const createData = await createRes.json();
            if (!createRes.ok) return;

            const projectId = createData.project._id;
            let updatedImagePath = createData.project.image;

            //UPLOAD PROJECT IMAGE
            if (selectedImageFile) {
                const formDataImage = new FormData();
                formDataImage.append("projectId", projectId);
                formDataImage.append("file", selectedImageFile);

                const imageRes = await fetch("/api/images/upload/project", {
                    method: "POST",
                    body: formDataImage,
                });

                const imageData = await imageRes.json();
                if (imageRes.ok) {
                    updatedImagePath = imageData.path;

                    await fetch(`/api/projects/update/${projectId}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ image: updatedImagePath }),
                    });
                }
            }

            //UPLOAD PROJECT FILES
            const formDataFiles = new FormData();
            formDataFiles.append("projectId", projectId);
            formDataFiles.append("projectName", formData.name);
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

                await fetch(`/api/projects/update/${projectId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ files: uploadedFiles }),
                });
            }

            //SUCCESS - redirect to new project page
            navigate(`/projects/${createData.project._id}`);
        }catch (err) {
            console.error(err);
        }finally{
            setLoading(false);
        }
    };

    return(
        <div className="card edit-project-form create">
            <form>
                
                <div {...getImageRootProps()} className="image-dropzone form-group image-upload">
                    <input {...getImageInputProps()} />
                    <img src={formData.image} alt="Project" width={120} />
                    <p>{isImageDragActive ? "Drop image here..." : "Drag & drop or click to select an image"}</p>
                    {errors.image && <small className="text-danger">{errors.image}</small>}
                </div>

                <div className="form-group">
                    <label htmlFor="name">Project Name</label>
                    <input id="name" name="name" type="text" onChange={handleChange}/><br/>
                    {errors.name && <small className="text-danger">{errors.name}</small>}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" onChange={handleChange}/><br/>
                </div>

                <div className="form-group">
                    <label htmlFor="type">Project Type</label>
                    <select id="type" name="type" className="form-select" onChange={handleChange}>
                        <option value="Desktop Application">Desktop Application</option>
                        <option value="Web Application">Web Application</option>
                        <option value="Mobile Application">Mobile Application</option>
                        <option value="Framework">Framework</option>
                        <option value="Library">Library</option>
                    </select><br/>
                </div>
                    
                <div className="form-group">
                    <label htmlFor="hashtags">Programming Languages (hashtags)</label>
                    <div className="inline-input">
                        <span>#</span>
                        <input
                            id="hashtags"
                            type="text"
                            value={currentTag}
                            onChange={(e) => setCurrentTag(e.target.value)}
                            placeholder="JavaScript"
                        />
                        <button type="button" onClick={handleAddHashtag}>+</button>
                        {errors.hashtags && <small className="text-danger">{errors.hashtags}</small>}
                    </div>

                    {/* Display Added hashtags */}
                    {hashtags.length > 0 && (
                        <ul className="hashtag-list">
                            {hashtags.map((tag, index) => (
                                <li key={index}>
                                    #{tag}{" "}
                                    <button type="button" onClick={() => handleRemoveHashtag(index)} className="remove-btn">Remove</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div><br/>
                
                <div className="form-group">
                    <label htmlFor="version">Version</label>
                    <input id="version" name="version" type="text" readOnly  defaultValue="1.0.0" /><br/>
                </div>
                
                <div className="form-group">
                    <label>Project Files (first check-in)</label>
                    <div {...getFilesRootProps()}>
                        <input {...getFilesInputProps()} />
                        {isFilesDragActive ? <p>Drop files here...</p> : <p>Click or drag files here</p>}
                    </div>
                    {files.length > 0 && (
                        <ul>
                            {files.map((file, idx) => (
                                <li key={idx}>
                                    {file.name} ({Math.round(file.size / 1024)} KB)
                                    <button type="button" onClick={() => handleRemoveFile(idx)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                    )}
                    {errors.files && <small className="text-danger">{errors.files}</small>}
                </div>

                <button type="button" onClick={onClose}>Cancel</button>
                <button type="submit" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Creating..." : "Create Project"}
                </button>
            
            </form>
        </div>
    )
};