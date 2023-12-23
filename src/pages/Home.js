import React, { useEffect, useRef } from 'react';
import "../styles/Home.css";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import SchoolIcon from "@material-ui/icons/School";
import WorkIcon from "@material-ui/icons/Work";
import ProjectIcon from "@material-ui/icons/Web";

import ProjectItem from "../components/ProjectItem";
import { ProjectList } from "../helpers/ProjectList.js";
import "../styles/Projects.css";


function Home() {
  const skillsRef = useRef(null); // Create a ref for the skills section

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-skills'); // Add class to trigger animation
            observer.unobserve(entry.target); // Optional: Stop observing after animation
          }
        });
      },
      { threshold: 0.5 } // Adjust this value based on when you want the animation to start
    );

    const skillsElement = skillsRef.current;
    if (skillsElement) {
      observer.observe(skillsElement); // Observe the skills section
    }

    return () => {
      if (skillsElement) {
        observer.unobserve(skillsElement); // Clean up
      }
    };
  }, []);

  return (
    <div className="home">
      <div className="about">
        <h2>Hi, My Name is Tommy!</h2>
        <div className="prompt">
          <p>CS @ Virginia Tech</p>
        </div>
      </div>

      <div className="skills" ref={skillsRef}>
        <h1>Skills</h1>
        <div className="skills-grid">
          <div className="skill-category">
            <h2>Languages</h2>
            <ul>
              <li>Java</li>
              <li>C#</li>
              <li>C</li>
              <li>Python</li>
              <li>JavaScript</li>
              <li>HTML</li>
              <li>CSS</li>
              <li>RISC-V</li>
              <li>MATLAB</li>
            </ul>
          </div>
          <div className="skill-category">
            <h2>Other Skills</h2>
            <ul>
              <li>.NET</li>
              <li>Visual Studio Code</li>
              <li>NodeJS</li>
              <li>React</li>
              <li>Multithreading</li>
              <li>MySQL</li>
              <li>XAML</li>
              <li>Unix</li>
              <li>Microsoft Office Suite</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="experience">
        <h1>Experience</h1>
        <VerticalTimeline lineColor="#3e497a">
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="June 2022 - May 2023"
            iconStyle={{ background: "#e9d35b", color: "#fff" }}
            icon={<WorkIcon />}
          >
            <h3 className="vertical-timeline-element-title">
              Virtual Production Assistant - Business Management Research Associates
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              Manassas, VA
            </h4>
            <p>Oversaw the learning and training of 1,000+ federal employees</p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            date="August 2022 - May 2025 Expected"
            iconStyle={{ background: "#3e497a", color: "#fff" }}
            icon={<SchoolIcon />}
          >
            <h3 className="vertical-timeline-element-title">
              Virginia Tech
            </h3>

            <h4 className="vertical-timeline-element-subtitle">
              Bachelor's Degree
            </h4>

            <p> Computer Science</p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="June 2023 - Present"
            iconStyle={{ background: "#e9d35b", color: "#fff" }}
            icon={<WorkIcon />}
          >
            <h3 className="vertical-timeline-element-title">
              Intern Software Engineer - Business Management Research Associates
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              Manassas, VA
            </h4>
            <p>
              Engineered tailored solutions to enhance workflow efficiency, resulting in an 80% time reduction
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>

      <div className="projects">
        <h1> My Personal Projects</h1>
        <div className="projectList">
          {ProjectList.map((project) => {
            return (
              <ProjectItem id={project.link} name={project.name} image={project.image} />
            );
          })}
        </div>
      </div>

    </div>
  );
}



export default Home;
