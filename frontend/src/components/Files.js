/* Anica Ferreira 40_u24581802 */
import React from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useState } from "react";
import { Code } from "./Code";
import { ProjectCheckIn } from "./ProjectCheckIn"; 

export const Files = ({ project, isMember, onUpdate }) =>{
    const currentUserId = sessionStorage.getItem("userId");
    const [files, setFiles] = useState(project.files);
    const [selectedFile, setSelectedFile] = useState(files[0]);
    const [showCheckIn, setShowCheckIn] = useState(false);
    const [checkedOutBy, setCheckedOutBy] = useState(project.checkedOutBy);

    const downloadAllFiles = async () => {
        try{
            await fetch(`/api/projects/download/${project._id}`, {
                method: "POST",
            });

            //create zip file
            const zip = new JSZip();

            const filePromises = project.files.map(async (file) => {
                const response = await fetch(file.path);
                const data = await response.arrayBuffer();
                zip.file(file.name, data);
            });

            await Promise.all(filePromises);

            const content = await zip.generateAsync({ type: "blob" });
            saveAs(content, `${project.name}_files.zip`);
        }catch (err) {
            console.error("Error downloading files:", err);
        }
    };

    //handle check out
    const handleCheckOut = async () =>{
        try{
            const res = await fetch('/api/activities/checkout', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    projectId: project._id,
                    userId: currentUserId,
                    version: project.version,
                }),
            });

            if (!res.ok) throw new Error("Failed to check out project");

            const data = await res.json();
            const updatedProject = data.data;
            setCheckedOutBy(currentUserId);
            onUpdate(updatedProject);            

            //download files after successful check in
            await downloadAllFiles();
        }catch(err){
            console.error("Error checking out project:", err);
        }
    }

    //handle check in
    const handleCheckIn = (newProject) => {
        setCheckedOutBy(null);
        setFiles(newProject.files);
        onUpdate(newProject);
        setShowCheckIn(false);
    };

    return(
        <div className="card">
            {isMember && (
            <>
                {checkedOutBy === null ? (
                    <button onClick={handleCheckOut}>Check Out</button>
                ) : checkedOutBy === currentUserId ? (
                    <button onClick={() => setShowCheckIn(true)}>Check In</button>
                ) : (
                    <button disabled title="This project is checked out by another member">Checked Out</button>
                )}
            </>
        )}

            <button className="download-btn" onClick={downloadAllFiles}>Download Files</button>
            <ul className="file-list">
                {files.map((file, index) => {
                    return(
                        <li 
                            key={index}
                            className={`file-item ${selectedFile?.name === file.name ? "active-file" : ""}`}
                            onClick={() => setSelectedFile(file)}
                        >
                            <i className="fas fa-file me-2"></i>
                            {file.name}
                        </li>
                    )
                })}
            </ul>

            {selectedFile && <Code file={selectedFile} />}

            {/* Modal overlay */}
            {showCheckIn && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <ProjectCheckIn project={project} onClose={() => setShowCheckIn(false)} onCheckIn={handleCheckIn}/>
                    </div>
                </div>
            )}

        </div>
    );
};