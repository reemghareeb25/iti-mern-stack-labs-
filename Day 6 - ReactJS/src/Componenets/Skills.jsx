import './style.css';

const skills = [
    { name: "Python, C++, Java, and C#", level: 90 },
    { name: "HTML, CSS, and JavaScript", level: 60 },
    { name: "Computer architecture and Digital design", level: 70 },
    { name: "Object-oriented programming, Data structures, and Algorithms", level: 55 },
    { name: "SQL database", level: 90 },
    { name: "Competitive programming", level: 98 },
  ];

function Skills() {
    return (
        <div className="skills">
            <h4 className="section-title">Technical Skills</h4>
            {skills.map((skill, index) => (
                <div key={index} className="skills-item">
                <p>{skill.name}</p>
                <div className="skill-bar">
                    <div
                    className="skill-level"
                    style={{ width: `${skill.level}%` }}>
                    </div>
                </div>
                </div>
            ))}
        </div>
    );
}

export default Skills;