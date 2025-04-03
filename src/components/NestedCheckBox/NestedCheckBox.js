import { useState } from "react"

const checkbox = [
    {
        "id": 1,
        "label": "Vehicle Management",
        "checked": false,
        "children": [
            {
                "id": 2,
                "label": "Fleet",
                "checked": false,
                "children": [
                    {
                        "id": 3,
                        "label": "Add Vehicle",
                        "checked": false
                    },
                    {
                        "id": 4,
                        "label": "Remove Vehicle",
                        "checked": false
                    }
                ]
            },
            {
                "id": 5,
                "label": "Maintenance",
                "checked": false,
                "children": [
                    {
                        "id": 6,
                        "label": "Schedule Maintenance",
                        "checked": false
                    },
                    {
                        "id": 7,
                        "label": "View Maintenance History",
                        "checked": false
                    }
                ]
            }
        ]
    },
    {
        "id": 8,
        "label": "Reservation Management",
        "checked": false,
        "children": [
            {
                "id": 9,
                "label": "Create Reservation",
                "checked": false
            },
            {
                "id": 10,
                "label": "Modify Reservation",
                "checked": false
            },
            {
                "id": 11,
                "label": "Cancel Reservation",
                "checked": false
            }
        ]
    }
]

export default function NestedCheckBox() {
    const [checkboxData, setCheckboxData] = useState(checkbox)

    function onSelect(id) {
        const updatedCheckbox = [...checkbox]
        toggleCheckBox(updatedCheckbox, id)
        setCheckboxData(updatedCheckbox)
    }

    function toggleCheckBox(checkboxData, id) {
        for (let checkbox of checkboxData) {
            if (checkbox.id == id) {
                checkbox.checked = !checkbox.checked;
                if (checkbox.children)
                    markChildren(checkbox.children, checkbox.checked)
                return
            }
            if (checkbox.children) {
                toggleCheckBox(checkbox.children, id)
                checkbox.checked = checkbox.children.every((data) => data.checked)
            }
        }
    }

    function markChildren(checkboxData, bool) {
        for (let checkbox of checkboxData) {
            checkbox.checked = bool;
            if (checkbox.children)
                markChildren(checkbox.children, bool)
        }
    }


    return (
        <>
            {checkboxData.map((data) => (<CheckBoxConfig key={data.id} checkboxData={data} onChange={onSelect}></CheckBoxConfig>))}
        </>
    )
}


function CheckBoxConfig({ checkboxData, onChange }) {
    return (
        <>
            <div style={{ marginLeft: '25px' }}>
                <input style={{ cursor: 'pointer' }} type="checkbox" checked={checkboxData.checked} onChange={() => onChange(checkboxData.id)}></input>
                <span>{checkboxData.label}</span>
                {checkboxData && checkboxData.children && checkboxData.children.map((data) => (<CheckBoxConfig onChange={onChange} key={data.id} checkboxData={data}></CheckBoxConfig>))}
            </div>
        </>
    )
}