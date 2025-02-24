import { useState } from "react";

function Tab({ onChange, name, isActive }) {
    return (
        <div 
            onClick={onChange} 
            style={{ 
                padding: "12px 20px",
                border: "1px solid black",
                cursor: "pointer",
                background: isActive ? "black" : "white",
                color: isActive ? "white" : "black",
                fontWeight: "bold"
            }}
        >
            {name}
        </div>
    );
}

const tabArray = [
    { name: "Pratik", content: "hcvjhdcjkdsnkn" },
    { name: "Raj", content: "cbdhjbcjdn" }
];

export default function TabConfig() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div style={{ width: "fit-content", margin: "25px" }}>
            {/* Tab Headers in one row */}
            <div style={{ display: "flex", borderBottom: "2px solid black" }}>
                {tabArray.map(({ name }, index) => (
                    <Tab 
                        key={index} 
                        isActive={index === activeTab} 
                        name={name} 
                        onChange={() => setActiveTab(index)}
                    />
                ))}
            </div>

            {/* Tab Content */}
            <div style={{ padding: "10px", border: "1px solid black", marginTop: "5px" }}>
                {tabArray[activeTab].content}
            </div>
        </div>
    );
}
