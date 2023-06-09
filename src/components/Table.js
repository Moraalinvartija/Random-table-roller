import React, { useState } from 'react';

const Table = ({ data }) => {
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);  
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  const handleRandomClick = () => {  //Function to use when select random row is clicked
    const randomIndex = Math.floor(Math.random() * data.length); // Generate a random index between 0 and the length of the data array
    setSelectedRowIndex(randomIndex);  // Update the state variable "selectedRowIndex" with the new random index
  };

  const handleRowSplice = () => {
    const index = parseInt(document.getElementById('rowIndex').value) - 1; // Get the index of the row to splice from the input element.
    if (!isNaN(index) && index >= 0 && index < data.length) {  // If the index is valid, update the selected row index.
      setSelectedRowIndex(index);
    }
  }

  let selectedRow = null;
  let tableData = data;
  if (selectedRowIndex !== null) {
    selectedRow = tableData[selectedRowIndex];
    tableData = tableData.slice(); // Make a copy of the array to avoid mutating the original data
    tableData.splice(selectedRowIndex, 1); // Remove the selected row from its current position in the array
    tableData.unshift(selectedRow); // Insert the selected row at the beginning of the array
  }

  return (
    <div className="container">
      <div className="button-container">
        <button onClick={handleRandomClick}>Select random row</button>
        <button onClick={handleRowSplice}>Select row by ID</button>
        <input id="rowIndex" type="number" placeholder="Row index" />
      </div>
      <table className="center">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr
              key={index}
              className={selectedRowIndex === index ? 'selected' : ''}
              onClick={() => setSelectedRowIndex(index)}
            >
              {Object.values(row).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
