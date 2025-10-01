/* Anica Ferreira 40_u24581802 */
import React from "react";
import { useState } from "react";

export const Sort = ({ sortOption, setSortOption }) =>{
    return (
        <div>
            <label htmlFor="sort">Sort by:</label>
            <select id="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="date">Date</option>
                <option value="popularity">Popularity</option>
                <option value="name">Project Name</option>
            </select>
        </div>
    );
};