import React from "react";
import { useNavigate } from "react-router-dom";

function ProjectItem({ image, name, id, desc, skills }) {
    const navigate = useNavigate();
    return (
        <div
            className="projectItem"
            onClick={() => {
                window.open(id);
            }}
        >
            {/* <div style={{ backgroundImage: `url(${image})` }} className="bgImage" /> */}
            <div style={{ backgroundColor: '#21325e' }} className="bgImage" />
            <h1> {name} </h1>
            <p> {desc} </p>
            <ul>
                {skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                ))}
            </ul>
        </div>
    );
}

export default ProjectItem;