/* Anica Ferreira 40_u24581802 */
import React from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export const Files = ({ project }) =>{
    const downloadAllFiles = async () => {
        try{
            await fetch(`/api/projects/download/${project._id}`, {
                method: "POST",
            });

            //create zip file
            const zip = new JSZip();

            const filePromises = project.files.map(async (file) => {
                const response = await fetch(file.url);
                const data = await response.arrayBuffer();
                zip.file(file.name, data);
            });

            await Promise.all(filePromises);

            const content = await zip.generateAsync({ type: "blob" });
            saveAs(content, `${project.name}_files.zip`);
        } catch (err) {
            console.error("Error downloading files:", err);
        }
    };

    return(
        <div className="card">
            <h3>Project Files</h3>
            <ul className="file-list">
                {project.files.map((file, index) => {
                    return(
                        <li key={index} className="file-item">
                            <i className="fas fa-file me-2"></i>
                            {file.name}
                        </li>
                    )
                })}
            </ul>
            <button  className="download-btn" onClick={downloadAllFiles}>Download Files</button>
        </div>
    );
};