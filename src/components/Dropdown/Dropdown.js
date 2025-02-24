import { useState } from "react";

function DropDown({ options, selected, onChange }) {
    let selectedValues = new Set(selected)
    const [isOpen, setIsOpen] = useState(false);

    function onSelectOption(selectedOption) {
        if(selectedValues.has(selectedOption)) {
            selectedValues.delete(selectedOption)
        }else {
            selectedValues.add(selectedOption)
        }
        onChange({
            value: [...new Set(selectedValues)]
        })

    }

    function onToggle() {
        setIsOpen((prev) => !prev);
    }

    return (
        <div style={{ width: "fit-content", margin: "25px", cursor: "pointer" }}>
            <div onClick={onToggle} style={{ border: "1px solid black", padding: "5px" }}>
                Select Option
            </div>
            {isOpen && (
                <div style={{ border: "1px solid black", padding: "5px", marginTop: "5px" }}>
                    {options.map(({ value, name }) => (
                        <label key={value} style={{ display: "flex", alignItems: "center", columnGap: "4px" }}>
                            <input
                                type="checkbox"
                                checked={selectedValues.has(value)}
                                onChange={() => onSelectOption(value)}
                            />
                            {name}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

const dropdownValue = [
    { value: "pratik", name: "Pratik Rajkotiya" },
    { value: "raj", name: "Raj Savsani" },
    { value: "aditya", name: "Aditya Birla" }
];

export default function DropDownConfig() {
    const [selected, setSelected] = useState(['pratik'])

    return <DropDown options={dropdownValue} selected={selected} onChange={({value}) =>  setSelected(value)}/>;
}
