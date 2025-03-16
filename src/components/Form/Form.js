import React, { useState } from "react";

export default function AllInputs() {
  const [formData, setFormData] = useState({
    text: "",
    password: "",
    number: 0,
    checkbox: "",
    radio: "",
    select: "",
    textarea: "",
    file: null,
    color: "#000000",
    range: 50,
    date: "",
    time: "",
    email: "",
    url: "",
  });

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", fontFamily: "Arial" }}>
      <h2>All Input Types</h2>
      <form>
        {/* Text Input */}
        <label>
          Text:
          <input
            type="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
          />
        </label>
        <br />

        {/* Password Input */}
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />

        {/* Number Input */}
        <label>
          Number:
          <input
            type="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
          />
        </label>
        <br />

        {/* Checkbox */}
        <label>
          Checkbox:
          <input
            type="checkbox"
            name="checkbox"
            value="pratik"
            // checked={formData.checkbox}
            onChange={handleChange}
          />
        </label>
        <br />

        {/* Radio Buttons */}
        <label>
          Radio Option 1:
          <input
            type="radio"
            name="radio"
            value="option1"
            checked={formData.radio === "option1"}
            onChange={handleChange}
          />
        </label>
        <label>
          Radio Option 2:
          <input
            type="radio"
            name="radio"
            value="option2"
            checked={formData.radio === "option2"}
            onChange={handleChange}
          />
        </label>
        <br />

        {/* Select Dropdown */}
        <label>
          Select:
          <select
            name="select"
            value={formData.select}
            onChange={handleChange}
          >
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
        </label>
        <br />

        {/* Textarea */}
        <label>
          Textarea:
          <textarea
            name="textarea"
            value={formData.textarea}
            onChange={handleChange}
          ></textarea>
        </label>
        <br />

        {/* File Input */}
        <label>
          File:
          <input type="file" name="file" onChange={handleChange} />
        </label>
        <br />

        {/* Color Picker */}
        <label>
          Color:
          <input
            type="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
          />
        </label>
        <br />

        {/* Range Input */}
        <label>
          Range:
          <input
            type="range"
            name="range"
            value={formData.range}
            min="0"
            max="100"
            onChange={handleChange}
          />
        </label>
        <br />

        {/* Date Input */}
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </label>
        <br />

        {/* Time Input */}
        <label>
          Time:
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
        </label>
        <br />

        {/* Email Input */}
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />

        {/* URL Input */}
        <label>
          URL:
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
          />
        </label>
        <br />

        <button type="submit" onClick={(e) => e.preventDefault()}>
          Submit
        </button>
      </form>

      <h3>Form Data:</h3>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
}
