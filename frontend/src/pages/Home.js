/* Anica Ferreira 40_u24581802 */
import React from "react";
import { Search } from "../components/Search";
import { Feed }  from "../components/Feed";
import { Sort } from "../components/Sort";

export const Home = () =>{
    return(
        <div>
            <h1>Home</h1>
            <Search />
            <h2>Activity Feed</h2>
            <Sort />
            <Feed />
        </div>
    )
};