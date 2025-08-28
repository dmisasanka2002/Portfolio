import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const useExcelDataLoader = (xlsxUrl, sheetName, rowFilter = null) => {
  const [sheetData, setSheetData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchXLSX = async () => {
      try {
        const response = await fetch(xlsxUrl);
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });

        const worksheet = workbook.Sheets[sheetName];
        const parsed = XLSX.utils.sheet_to_json(worksheet);

        const filtered = rowFilter ? parsed.filter(rowFilter) : parsed;
        setSheetData(filtered);
      } catch (error) {
        console.error("Excel load error:", error);
        setSheetData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchXLSX();
  }, [xlsxUrl, sheetName, rowFilter]);

  return { data: sheetData, loading };
};

export default useExcelDataLoader;

// ✅ Usage:

// *Get full sheet (no filter):*

// ```js
// const { data, loading } = useExcelDataLoader(xlsxUrl, "projects");
// ```

// *Get filtered sheet:*

// ```js
// const { data, loading } = useExcelDataLoader(
//   xlsxUrl,
//   "projects",
//   (row) => row.status === "completed"
// );
// ```