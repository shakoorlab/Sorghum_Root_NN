import React from "react";
import { useMaskData } from "../context/MaskDataContext.jsx";

function MaskResults() {
  const { maskData } = useMaskData(); // Access data from React context

  // Log data types for troubleshooting
  // console.log("Data types:", {
  //   root_count: typeof maskData.root_count,
  //   average_root_diameter: typeof maskData.average_root_diameter,
  //   total_root_length: typeof maskData.total_root_length,
  //   total_root_area: typeof maskData.total_root_area,
  //   total_root_volume: typeof maskData.total_root_volume,
  // });

  if (!maskData || Object.keys(maskData).length === 0) {
    return <p>No data available or still loading...</p>;
  }

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
    const csvData = convertToCSV(maskData);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "root_data.csv");
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
        <div>{maskData.root_count ? `${maskData.root_count}` : "No data"}</div>
        <strong>Average Root Diameter (mm):</strong>
        <div>
          {maskData.average_root_diameter
            ? `${maskData.average_root_diameter}`
            : "No data"}
        </div>
        <strong>Total Root Length (mm):</strong>
        <div>
          {maskData.total_root_length
            ? `${maskData.total_root_length}`
            : "No data"}
        </div>
        <strong>Total Root Area (mm):</strong>
        <div>
          {maskData.total_root_area ? `${maskData.total_root_area}` : "No data"}
        </div>
        <strong>Total Root Volume (mm):</strong>
        <div>
          {maskData.total_root_volume
            ? `${maskData.total_root_volume}`
            : "No data"}
        </div>
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
