import React from "react";

function MaskResults() {
  // Mock data for display
  const mockData = {
    root_count: 1,
    average_root_diameter: 2,
    total_root_length: 3,
    total_root_area: 4,
    total_root_volume: 5,
  };
  const data = {
    id: 0,
    picture: 0,
    threshold: 0,
    created: "2024-04-12T16:52:58.455Z",
    updated: "2024-04-12T16:52:58.455Z",
    root_count: 1,
    average_root_diameter: 2,
    total_root_length: 3,
    total_root_area: 4,
    total_root_volume: 5,
  };

  const convertToCSV = (objArray) => {
    const array = [objArray];
    const csv = array.map((row) =>
      Object.keys(row)
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(",")
    );
    csv.unshift(Object.keys(objArray).join(",")); // Add header row
    return csv.join("\r\n");

    function replacer(key, value) {
      return value === null ? "" : value; // Replace null with empty string in CSV output
    }
  };

  const downloadCSV = () => {
    const csvData = convertToCSV(data);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <strong>Root Count:</strong>
        <div>{mockData.root_count}</div>
        <strong>Average Root Diameter:</strong>
        <div>{mockData.average_root_diameter}</div>
        <strong>Total Root Length:</strong>
        <div>{mockData.total_root_length}</div>
        <strong>Total Root Area:</strong>
        <div>{mockData.total_root_area}</div>
        <strong>Total Root Volume:</strong>
        <div>{mockData.total_root_volume}</div>
      </div>

      <button
        style={{
          display: "block",
          width: "max-content",
          margin: "40px 0",
          padding: "10px 20px",
          borderRadius: "10px",
          border: "1px solid",
          cursor: "pointer",
          fontWeight: "bold",
          boxShadow: "0 2px 5px 1px rgba(0, 0, 0, 0.2)",
          transition: "background-color 0.2s, border-color 0.2s",
          backgroundColor: "#baffba",
          borderColor: "#008000",
          color: "#008000",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#89f589";
          e.target.style.color = "#023a02";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#baffba";
          e.target.style.color = "#008000";
        }}
        onClick={downloadCSV}
      >
        Download CSV
      </button>
    </>
  );
}

export default MaskResults;
