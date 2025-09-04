/* Anica Ferreira u24581802 */
import React from "react";
import { Header } from "../components/Header";
import { Search } from "../components/Search";
import { Feed }  from "../components/Feed";
import { Sort } from "../components/Sort";

export const Home = () =>{
    return(
        <div>
            <Header isAuthenticated={true}/>
            <h1>Home</h1>
            <Search />
            <h2>Activity Feed</h2>
            <Sort />
            <Feed />
        </div>
    )
};