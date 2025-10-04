import { useState } from "react";
import "./CollideCircle.css";

function CollideCircle() {
  const [circles, setCircles] = useState([]);

  function randomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  function createCircle(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCircles((prev) => {
      const newCircle = {
        color: randomRGB(),
        left: x,
        top: y,
        zIndex: prev.length + 1,
        radius: 50, 
      };

      const updatedCircles = prev.map((c) =>
        isCollide(c, newCircle)
          ? { ...c, color: randomRGB() }
          : c
      );

      return [...updatedCircles, newCircle];
    });
  }

  function isCollide(c1, c2) {
    const dx = c1.left - c2.left;
    const dy = c1.top - c2.top;
    const distanceSq = dx * dx + dy * dy;
    const radiusSum = 50 * 2;
    return distanceSq <= radiusSum * radiusSum; 
  }

  return (
    <>
      <div className="circle-container" onClick={createCircle}>
        {circles.map((data) => {
          return (
            <div
              key={data.zindex}
              style={{
                top: `${data.top}px`,
                left: `${data.left}px`,
                backgroundColor: data.color,
                zIndex: data.zIndex,
              }}
              className="dynamic-circle"
            ></div>
          );
        })}
      </div>
    </>
  );
}

export default CollideCircle;
