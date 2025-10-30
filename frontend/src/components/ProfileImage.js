/* Anica Ferreira 40_u24581802 */
import React from "react";

export const ProfileImage = ({ profile, size="medium", preview = false }) =>{
    const sizeClasses = {
        small: "small-img",
        medium: "medium-img",
        large: "large-img",
    };

    return(
        <span className={`placeholder-stack ${sizeClasses[size]}`}>
            { preview ? (
                <img className={sizeClasses[size]}  src={profile.image} alt={`${profile.username} image.`}/>
            ): profile.placeholder ? (
                <>
                    {/* If the profile image is a placeholder, layer all the images */}
                    <img src={profile.placeholderImages.background} className="absolute inset-0 w-full h-full object-cover"/>
                    <img src={profile.placeholderImages.body} className="absolute inset-0 w-full h-full object-cover"/>
                    <img src={profile.placeholderImages.face} className="absolute inset-0 w-full h-full object-cover"/>
                    <img src={profile.placeholderImages.head} className="absolute inset-0 w-full h-full object-cover"/>
                    <img src={profile.placeholderImages.accessory} className="absolute inset-0 w-full h-full object-cover"/>
                </>
            ) : (
                <><img className={sizeClasses[size]}  src={profile.image} alt={`${profile.username} image.`}/></>
            )}
        </span>
    );
};