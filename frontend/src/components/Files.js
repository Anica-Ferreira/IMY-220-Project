/* Anica Ferreira 40_u24581802 */
import React from "react";

export const Files = ({ files }) =>{
    const downloadAllFiles = () => {
        files.forEach(file => {
            const link = document.createElement("a");
            link.href = file.url;
            link.download = file.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    };

    return(
        <div className="card">
            <h3>Project Files</h3>
            <ul className="file-list">
                {files.map((file, index) => {
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