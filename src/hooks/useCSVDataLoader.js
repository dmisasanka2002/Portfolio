import { useEffect, useState, useMemo } from "react";
import Papa from "papaparse";

const useCSVDataLoader = (csvUrl) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  const csvData = rows.map((row, rowIndex) => {
    const rowData = headers.reduce((acc, header, i) => {
      acc[header.trim().toLowerCase()] = row[i];
      return acc;
    }, {});

    // return {
    //   title: rowData["title"] || "",
    //   description: rowData["description"] || "",
    //   tags: rowData["tags"] || "",
    //   link: rowData["link"] || "",
    //   source: rowData["source"] || "",
    //   highlight: rowData["highlight"].toLowerCase()==="true" || "",
    //   category: rowData["category"] || "",
    // };

    return {
      id: rowIndex + 1,
      title: rowData["title"] || "",
      description: rowData["description"] || "",
      shortDescription: rowData["shortdescription"] || "",
      fullDescription: rowData["fulldescription"] || "",
      category: rowData["category"] || "",
      tags: rowData["tags"] ? rowData["tags"] : "",
      status: rowData["status"] || "",
      date: rowData["date"] || "",
      team: rowData["team"] || "",
      rating: rowData["rating"] || "",
      technologies: rowData["technologies"] ? rowData["technologies"] : "",
      features: rowData["features"] ? rowData["features"] : "",
      thumbnail: rowData["thumbnail"] || "",
      images: rowData["images"] ? rowData["images"] : "",
      videos:
        rowData["videos"] && rowData["videos"][0]
          ? `${rowData["videos"][0].title} | ${rowData["videos"][0].thumbnail} | ${rowData["videos"][0].description}`
          : "",

      LiveUrl: rowData["liveurl"] || "",
      source: rowData["source"] || "",
      link: rowData["link"] || "",
      highlight: rowData["status"]?.toLowerCase() === "completed" || "",
    };
  });

  return { csvData, loading };
};

export default useCSVDataLoader;
