/* Anica Ferreira 40_u24581802 */
import React from "react";
import { useEffect, useState } from "react";
import { ProjectPreview } from "../components/ProjectPreview";
import { ProfilePreview } from "../components/ProfilePreview";
import { ActivityItem } from "../components/ActivityItem";
import { useNavigate } from "react-router-dom";

export const Admin = () =>{
    const [activeTab, setActiveTab] = useState("users");
    const switchTab = (tab) => setActiveTab(tab);
    const [users, setUsers] = useState(null);
    const [projects, setProjects] = useState(null);
    const [activities, setActivities] = useState(null);
    const [totals, setTotals] = useState({ users: 0, projects: 0, activities: 0 });
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() =>{
        const fetchAdminData = async () => {
            try{
                setLoading(true);
                const res = await fetch("/api/users/admin");
                const data = await res.json();

                setUsers(data.data.users);
                setProjects(data.data.projects);
                setActivities(data.data.activities);
                setTotals(data.totals);

            }catch(error){
                console.error("Failed to fetch admin overview: ", error);
            }finally{
                setLoading(false);
            }   
        }
        fetchAdminData();
    }, []);

    const handleDeleteActivity = async (id) =>{
        try{
            const res = await fetch(`/api/activities/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();

            if(res.ok) {
                setActivities((prev) => prev.filter((a) => String(a._id) !== String(id)));
                setTotals((prev) => ({ ...prev, activities: prev.activities - 1 }));
            }else{
                alert(data.message || "Failed to delete activity.");
            }
        }catch(error) {
            console.error("Error deleting activity:", error);
        }
    }

    return (
        <div>
            <h1>Admin</h1>
            <h3 className="text-white mb-4">
                Manage all users, projects, and activity across the platform.
            </h3>

            <div className="feed-header d-flex align-items-center mb-3">
                <ul className="nav nav-tabs">
                {/* Users */}
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === "users" ? "active" : ""}`} onClick={() => switchTab("users")}>
                        <i className="fa-solid fa-user-gear"></i> Users
                    </button>
                </li>

                {/* Projects */}
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === "projects" ? "active" : ""}`} onClick={() => switchTab("projects")}>
                        <i className="fa-solid fa-diagram-project"></i> Projects
                    </button>
                </li>

                {/* Activity */}
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === "activity" ? "active" : ""}`} onClick={() => switchTab("activity")}>
                        <i className="fa-solid fa-chart-line"></i> Activity
                    </button>
                </li>
                </ul>
            </div>

            <section className="tab-content">
                <div className="tab-pane active">

                    {activeTab === "users" && 
                        <div className="card">
                            <h4>Manage Users</h4>
                            <p>Total Users: {totals.users}</p>
                                {users && users.map((user) => (           
                                    <div key={user._id}>
                                        <ProfilePreview  profile={user}/>
                                        <button onClick={() => navigate(`/profile/${user._id}?adminManage=true`)}>
                                            Manage Profile
                                        </button>
                                    </div>                    
                                ))}
                        </div>
                    }

                    {activeTab === "projects" && 
                        <div className="card">
                            <h4>Manage Projects</h4>
                            <p>Total Projects: {totals.projects}</p>
                                {projects && projects.map((project) => (           
                                    <div key={project._id}>
                                        <ProjectPreview  project={project}/>
                                        <button onClick={() => navigate(`/projects/${project._id}?adminManage=true`)}>
                                            Manage Project
                                        </button>
                                    </div>                 
                                ))}
                        </div>
                    }

                    {activeTab === "activity" && 
                        <div className="card">
                            <h4>Manage Activity</h4>
                            <p>Total Activity: {totals.activities}</p>
                                {activities && activities.map((activity) => (           
                                    <div key={activity._id}>
                                        <ActivityItem  activity={activity} showAll={false} showMessage={true} />
                                        <button onClick={() => handleDeleteActivity(activity._id)}>
                                            Delete Activity
                                        </button>
                                    </div>                    
                                ))}
                        </div>
                    }

                </div>
            </section>
        </div>
    );
};