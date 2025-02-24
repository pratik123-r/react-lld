import { useState } from "react";

function Accordion({ name, children, isOpen, onChange }) {
    return (
        <div>
            {/* Clickable Title */}
            <div onClick={onChange} style={{ cursor: "pointer", fontWeight: "bold", padding: "10px", border: "1px solid black" }}>
                {name}
            </div>
            {/* Expandable Content */}
            {isOpen && <div style={{ padding: "10px", border: "2px solid black" }}>{children}</div>}
        </div>
    );
}

const accordionArray = [
    { name: "Pratik", content: "hcvjhdcjkdsnkn" },
    { name: "Raj", content: "cbdhjbcjdn" }
];

export default function AccordionConfig() {
    const [activeIndex, setActiveIndex] = useState(-1);

    return (
        <>
            {accordionArray.map(({ name, content }, index) => (
                <Accordion
                    key={index}
                    name={name}
                    isOpen={index === activeIndex}
                    onChange={() => setActiveIndex(index)} // Toggle accordion
                >
                    {content}
                </Accordion>
            ))}
        </>
    );
}
