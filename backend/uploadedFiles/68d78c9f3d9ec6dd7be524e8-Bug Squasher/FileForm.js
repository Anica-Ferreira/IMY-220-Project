//Anica Ferreira u24581802
import React, { useState } from "react";

export const FileForm = ({ onUpload }) => {
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", file);

        await fetch("/upload", {
            method: "POST",
            body: formData,
        });

        setFile(null);

        //refresh
        onUpload();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" accept=".png,.jpg" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}/>
            <button type="submit">Upload</button>
        </form>
    );
};