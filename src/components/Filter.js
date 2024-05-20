import React from "react";

const Filter = ({ filterRooms, setFilterRooms }) => {
    const onChange = (e) => {
        const newFilter = e.target.value;
        setFilterRooms(newFilter);
        console.log("Filter rooms:", filterRooms);
    };

    return (
        <div className="filter">
            <label htmlFor="filter" className="filter__text">
                Filter by rooms:
            </label>

            <input
                className="filter__input"
                type="number"
                value={filterRooms}
                onChange={(e) => onChange(e)}
                min={1}
                max={100}
                name="filter"
            />
        </div>
    );
};

export default Filter;
