import React from "react";

const Sort = ({ sort, setSort }) => {
    const onChange = (e) => {
        const newSort = e.target.value;
        setSort(newSort);
    };

    return (
        <div className="sort">
            <label htmlFor="sort" className="sort__text">
                Sort:
            </label>
            <select
                className="sort__select"
                name="sort"
                value={sort}
                onChange={(e) => onChange(e)}
            >
                <option value="asc">ASC</option>
                <option value="desc">DESC</option>
            </select>
        </div>
    );
};

export default Sort;
