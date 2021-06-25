import React from "react";

export default function OnStart(props) {
    let [activeIndex, setActiveIndex] = React.useState(0);
    let [values, setValues] = React.useState({});
    let [input, setInput] = React.useState({});

    const formData = [
        { index: 0, label: "Artist Name:", isRequired: true },
        { index: 1, label: "Artwork Title:", isRequired: false },
        { index: 2, label: "Work Type:", isRequired: true },
        { index: 3, label: "Media:", isRequired: true },
        { index: 4, label: "Support:", isRequired: true },
        { index: 5, label: "Dimensions:", isRequired: true },

    ]

    const handleChange = event => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value })
    }

    const handleNext = () => {
        if (document.getElementById("test").value) {
            setActiveIndex(activeIndex++);
        }
    }

    const setInputValues = (event) => {
        setInput(event.target.value);
    }

    const handleSkip = () => {
        setActiveIndex(activeIndex++);
    }

    const checkIfActive = data => {
        return data.index === activeIndex;
    }

    const renderMarkup = value => {
        const { index, isRequired } = value;
        if (checkIfActive(value)) {
            return (
                <div>
                    <div>
                        <span>{value.label}</span>
                        <span>{value.isRequired ? "Required" : "Optional"}</span>
                    </div>
                    <div>
                        <input name={value.label} id="test" />
                    </div>
                    <div className="action-container">
                        {isRequired && <button onClick={() => handleNext()}>Next</button>}
                        {!isRequired && <button onClick={() => handleSkip()}>Skip</button>}
                    </div>
                </div>
            )
        } else {
            return;
        }
    }

    return (
        <div className="onstart-container" style={{ textAlign: 'center', minHeight: '450px', marginLeft: '0 !important' }}>
            {formData.map(value => renderMarkup(value))}
        </div>
    )
}
// const darkColor = '#272B41';
