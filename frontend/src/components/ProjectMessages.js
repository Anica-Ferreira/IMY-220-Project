/* Anica Ferreira 40_u24581802 */
import React from "react";
import { ActivityItem } from "./ActivityItem";
import { useState, useEffect } from "react";

//helper function
const formatDate = (dateStr) =>{
    const date = new Date(dateStr);
    const format = { year: "numeric", month: "long" };
    return date.toLocaleDateString(undefined, format);
}

export const ProjectMessages = ({ projectId }) =>{
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    //Fetch all activity
    useEffect(() => {
        const fetchActivity = async () =>{
            setLoading(true);
            setError("");
            try{
                const res = await fetch(`/api/activities/formatted`);
                const data = await res.json();
                if (res.ok) {
                    const projectActivities = data.filter(act => act.projectId === projectId);
                    setActivities(projectActivities);
                }
            }catch (err){
                console.error(err);
            }finally{
                setLoading(false);
            }
        };
        fetchActivity();
    }, [projectId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">{error}</p>;
    if (!activities.length) return;

    //group by month/year
    const yearGroup = activities.reduce((acc, activity) =>{
        const monthYear = formatDate(activity.timestamp);
        if (!acc[monthYear]) acc[monthYear] = [];
        acc[monthYear].push(activity);
        return acc;
    }, {});

    //convert to object
    const groupedArr = Object.entries(yearGroup);

    return(
        <div>
            {groupedArr.map(([monthYear, monthActivities]) => (
                <div key={monthYear}>
                    <h3>{monthYear}</h3>
                    {monthActivities.map((act, index) => (
                        <ActivityItem key={index} activity={act} showAll={false} showMessage={true}/>
                    ))}
                </div>
            ))}
        </div>
    )
}