import React, { useState } from 'react';

const DropdownCheckbox = ({ options, selectedOptions, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      onChange([...selectedOptions, value]);
    } else {
      onChange(selectedOptions.filter((option) => option !== value));
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block w-full">
      <div className="border rounded p-2 cursor-pointer" onClick={toggleDropdown}>
        {Array.isArray(selectedOptions) && selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Selecciona roles'}
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
          {options.map((option) => (
            <label key={option} className="block px-4 py-2">
              <input
                type="checkbox"
                value={option}
                checked={Array.isArray(selectedOptions) && selectedOptions.includes(option)}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownCheckbox;