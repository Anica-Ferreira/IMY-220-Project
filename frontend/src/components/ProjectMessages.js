import React from "react";
import { ActivityItem } from "./ActivityItem";

//helper function
const formatDate = (dateStr) =>{
    const date = new Date(dateStr);
    const format = { year: "numeric", month: "long" };
    return date.toLocaleDateString(undefined, format);
}

export const ProjectMessages = ({ activities = [] }) =>{
    //sort in reverse chronological order
    const sortedActivities = [...activities].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    //group by month/year
    const yearGroup = sortedActivities.reduce((acc, activity) =>{
        const monthYear = formatDate(activity.date);
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
                    {monthActivities.map((activity) => (
                        <ActivityItem key={`${activity.id}-${activity.userId}`} activity={activity} showAll={false}/>
                    ))}
                </div>
            ))}
        </div>
    )
}