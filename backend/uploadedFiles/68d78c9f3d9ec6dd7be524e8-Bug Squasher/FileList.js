//Anica Ferreira u24581802
import React from "react";

export const FileList = ({ files }) => {
    return (
        <div>
            <h3>Uploaded Files</h3>
            <ul>
                {files.map((file, index) => (
                <li key={index}>
                    <img src={file.url}/>
                    <a href={file.url} download>
                        Download
                    </a>
                </li>
                ))}
            </ul>
        </div>
    );
};