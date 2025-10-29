/* Anica Ferreira 40_u24581802 */
import React from "react";
import { useState, useEffect } from "react";
import { Feed }  from "../components/Feed";
import { Loader } from "../components/Loader";

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

    if (!user) return null;

    //filter local and global feed
    
    //local - ownn projects, isFriendsProjects or Saved projects
    const local = filteredActivity.filter(act => {
        const userId = act.userId.toString();
        const projectId = act.projectId.toString();
        const isOwn = userId === user._id.toString();

        const isFriend = user.friends.some(friendId => friendId.toString() === userId);
        const isSavedProject = user.savedProjects.some(savedId => savedId.toString() === projectId);

        return isOwn || isFriend || isSavedProject;
    });

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

            {loading && (
                <div className="loader-overlay">
                    <Loader />
                </div>
            )}
        </div>
    )
};