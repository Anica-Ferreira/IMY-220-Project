/* Anica Ferreira 40_u24581802 */
import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export const Search = () =>{
    const searchInputRef = useRef();
    const navigate = useNavigate();
    
    const search = (event) =>{
        event.preventDefault();
        const input = searchInputRef.current.value.trim();
        if (input) {
            navigate(`/results?q=${encodeURIComponent(input)}`);
        }
    }

    return (
        <form onSubmit={search}>
            <div className="search-wrapper">
                <input type="text" id="search" name="search" placeholder="Search CabiNet..." ref={searchInputRef} autoComplete="off"/>
                <button type="submit" className="search-button">
                    <i className="fas fa-search"></i>
                </button>
            </div>
        </form>
    );
};