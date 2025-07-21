import { useEffect, useState, useMemo } from "react";
import Papa from "papaparse";

const useCSVDataLoader = (csvUrl) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching CSV from URL:", csvUrl);
    const fetchCSV = async () => {
      try {
        const response = await fetch(csvUrl);
        const csvText = await response.text();
        const parsed = Papa.parse(csvText, {
          header: false,
          skipEmptyLines: true,
        });
        setData(parsed.data);
      } catch (error) {
        console.error("CSV load error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCSV();
  }, [csvUrl]);


  const headers = data[0] || [];
  const rows = data.slice(1);

  // Build student objects using headers only
  const csvData = rows.map((row) => {
    const rowData = headers.reduce((acc, header, i) => {
      acc[header.trim().toLowerCase()] = row[i];
      return acc;
    }, {});

    return {
      title: rowData["title"] || "",
      description: rowData["description"] || "",
      tags: rowData["tags"] || "",
      link: rowData["link"] || "",
      highlight: rowData["highlight"] || "",
      category: rowData["category"] || "",
    };
  });

  return { csvData, loading };
};

export default useCSVDataLoader;
