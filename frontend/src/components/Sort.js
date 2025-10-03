/* Anica Ferreira 40_u24581802 */
import React from "react";
import { useState } from "react";

export const Sort = ({ sortOption, setSortOption }) =>{
    return (
        <div className="d-flex align-items-center mb-3 sort-container">
            <label htmlFor="sort" className="mx-2">Sort by:</label>
            <select id="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="form-select w-auto fw-regular">
                <option value="date">Date</option>
                <option value="popularity">Popularity</option>
                <option value="name">Project Name</option>
            </select>
        </div>
    );
};