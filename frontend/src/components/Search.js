/* Anica Ferreira 40_u24581802 */
import React from "react";
import { useRef } from "react";

export const Search = () =>{
    const searchInputRef = useRef();
    
    const search = (event) =>{
        event.preventDefault();
        const input = searchInputRef.current.value;
        //handle search 
    }

    return (
        <form onSubmit={search}>
        <input
            type="text"
            id="search"
            name="search"
            placeholder=""
            ref={searchInputRef}
        />
        <input className="button" type="submit" value="search"/>
        </form>
    );
};