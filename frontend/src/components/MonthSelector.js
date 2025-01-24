import React from "react";

const MonthSelector = ({ month, onChange }) => (
    <label htmlFor="month">
        Select Month:
        <select
            name='month'
            id='month'
            value={month}
            onChange={(e) => onChange(e.target.value)}
        >
            <option value="">All</option>
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
                <option key={m} value={m}>
                    {m}
                </option>
            ))}
        </select>
    </label>
)

export default MonthSelector;