import React from "react";
import "./DropDown.css";

const DropDown = ({ items, val, lab, clickEvt }) => {
  return (
    <div className="form-group">
      <label className="control-label" htmlFor={lab}>
        {lab}
      </label>
      <select
        type="text"
        id={lab}
        value={val}
        onBlur={clickEvt}
        onChange={clickEvt}
      >
        {items.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
