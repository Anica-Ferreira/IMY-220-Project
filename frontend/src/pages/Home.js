/* Anica Ferreira 40_u24581802 */
import React from "react";
import { useState, useEffect } from "react";

import { Feed }  from "../components/Feed";

export const Home = () =>{
    const [activity, setActivity] = useState([]);
    const [filteredActivity, setFilteredActivity] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [sortOption, setSortOption] = useState("date");

    const currentUserID = sessionStorage.getItem("userId");

    //Fetch all activity
    useEffect(() => {
        const fetchActivity = async () =>{
            setLoading(true);
            setError("");
            try{
                //fetch user
                const userRes = await fetch(`/api/users/${currentUserID}`);
                const userData = await userRes.json();
                if (!userRes.ok) {
                    setError(userData.error_message);
                }
                setUser(userData);

                //fetch activity
                const activityRes = await fetch("/api/activities/formatted");
                const activityData = await activityRes.json();
                if (!activityRes.ok) {
                    setError(activityData.error_message);
                }

                setActivity(activityData);
                setFilteredActivity(activityData);
            }catch (err){
                console.error(err);
            }finally{
                setLoading(false);
            }
        };
        fetchActivity();
    }, [currentUserID]);

    //sort if sortOption changess
    useEffect(() => {
        if (!activity) return;

        const sorted = [...activity]; //deep copy

        switch (sortOption) {
            case "popularity":
                sorted.sort((a, b) => b.downloads - a.downloads);
                break;
            case "name":
                sorted.sort((a, b) =>
                    a.projectName.toLowerCase().localeCompare(b.projectName.toLowerCase())
                );
                break;
            case "date":
            default:
                sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
        }

        setFilteredActivity(sorted);

    }, [sortOption, activity]);


    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">{error}</p>;
    if (!user) return null;

    //filter local and global feed
    
    //only users friends
    const local = filteredActivity.filter(act =>
        Array.isArray(user.friends) && act.userId &&  
        (act.userId.toString() === user._id.toString() || user.friends.map(f => f.toString()).includes(act.userId.toString()))
    );

    const global = filteredActivity;

    return(
        <div id="home">
            <h1>Home</h1>
            <h2>Activity Feed</h2>
            <Feed 
                localActivity={local} 
                globalActivity={global} 
                sortOption={sortOption} 
                setSortOption={setSortOption} 
            />
        </div>
    )
};