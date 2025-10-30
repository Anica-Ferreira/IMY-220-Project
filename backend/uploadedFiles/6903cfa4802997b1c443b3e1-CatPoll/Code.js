/* Anica Ferreira 40_u24581802 */
import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { duotoneSpace } from "react-syntax-highlighter/dist/esm/styles/prism"; //or "dracula" still decding hmm

export const Code = ({ file }) => {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchFile = async () => {
            try{
                const res = await fetch(file.path);
                if (!res.ok) throw new Error(`Failed to load file: ${res.status}`);
                const text = await res.text();
                setCode(text);
            }catch(err) {
                console.error("Failed to load file:", err);
                setError(err.message);
            }finally{
                setLoading(false);
            }
        };
        fetchFile();
    }, [file.path]);

    if (loading) return <p>Loading {file.name}...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    //get file extension
    const ext = file.name.split(".").pop();
    const language = ext || "text"; 

    return(
        <div className="code-viewer">
        <h4 className="fs-5 mb-2">{file.name}</h4>
            <div className="code">
                <SyntaxHighlighter language={language} style={duotoneSpace} showLineNumbers >
                    {code}
                </SyntaxHighlighter>    
            </div>
        
        </div>
    );
};