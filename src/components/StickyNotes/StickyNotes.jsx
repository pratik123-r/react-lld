import React, { useRef, useState, useCallback } from "react";
import "./StickyNotes.css";

export default function StickyNotes() {
  const [stickyNotes, setStickyNotes] = useState([]);
  const inputRef = useRef(""); 
  const dragOffset = useRef({ x: 0, y: 0 });

  const onAddNote = useCallback(() => {
    if (!inputRef.current) return;

    const raw = inputRef.current.value;
    const noteVal = (raw || "").trim();

    if (!noteVal) {
      inputRef.current.value = "";
      inputRef.current.focus();
      return;
    }

    const id = Date.now() + Math.floor(Math.random() * 1000);

    setStickyNotes((prev) => [
      ...prev,
      {
        id,
        x: 0,
        y: 0,
        note: noteVal,
        zindex: prev.length + 1,
      },
    ]);

    inputRef.current.value = "";
    inputRef.current.focus();
  }, []);

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        onAddNote();
      }
    },
    [onAddNote]
  );

  function handleOnDrop(e) {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("text/plain");
    const containers = document.getElementsByClassName("sn-container");
    if (containers.length === 0) return;

    const container = containers[0]; // first element with this class
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left - dragOffset.current.x;
    const y = e.clientY - rect.top - dragOffset.current.y;
    let newNotes = stickyNotes.map((value) => {
      if (value.id == draggedId) {
        return {
          ...value,
          x: x,
          y: y,
        };
      }
      return value;
    });
    setStickyNotes(newNotes);
  }
  function handleDragOver(e) {
    e.preventDefault();
  }
  function handleDragStart(e) {
    const id = e.target.dataset.id;
    
    e.dataTransfer.setData("text/plain", id);
    const note = stickyNotes.find((n) => n.id == id);
    console.log(e.clientX - note.x , e.clientY - note.y);
    const containers = document.getElementsByClassName("sn-container");
    if (containers.length === 0) return;

    const container = containers[0]; // first element with this class
    const rect = container.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX -  rect.left - note.x,
      y: e.clientY - rect.top - note.y,
    };
  }

  return (
    <>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          type="text"
          ref={inputRef}
          placeholder="Write a note and press Enter or Submit"
          onKeyDown={onKeyDown}
          aria-label="New sticky note"
          style={{ flex: 1, padding: "8px 10px" }}
        />
        <button onClick={onAddNote}>Submit</button>
      </div>

      <div
        onDragOver={handleDragOver}
        onDrop={handleOnDrop}
        className="sn-container"
      >
        {stickyNotes.map((value) => (
          <div
            onDragStart={handleDragStart}
            draggable
            className="sticky-note"
            data-id={value.id}
            style={{ left: value.x + "px", top: value.y + "px" }}
            key={value.id}
          >
            {value.note}
          </div>
        ))}
      </div>
    </>
  );
}
