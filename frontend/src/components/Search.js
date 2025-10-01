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
        <input type="text" id="search" name="search" placeholder="" ref={searchInputRef}/>
        <input className="button" type="submit" value="search"/>
        </form>
    );
};