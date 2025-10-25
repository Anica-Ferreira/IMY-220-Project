//Anica Ferreira u24581802
import React, { useState, useEffect } from "react";
import { FileForm } from "./components/FileForm";
import { FileList } from "./components/FileList";

export const App = () => {
    const [files, setFiles] = useState([]);

    const fetchFiles = async () => {
        const res = await fetch("/files");
        if (res.ok) {
            const data = await res.json();
            setFiles(data);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

  return (
    <div>
        <h1>File Management System </h1>
        <FileForm onUpload={fetchFiles}/>
        <FileList files={files} />
    </div>
  );
};
