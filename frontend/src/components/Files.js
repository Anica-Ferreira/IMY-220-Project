/* Anica Ferreira 40_u24581802 */
import React from "react";
import { useState } from "react";

export const Files = ({ files }) =>{
    return(
        <div>
            <h3>Project Files</h3>
            <button>Download Files</button>
            <ul>
                {files.map((file, index) => {
                    return(
                        <li key={index}>{file.name}</li>
                    )
                })}
            </ul>
        </div>
    );
};