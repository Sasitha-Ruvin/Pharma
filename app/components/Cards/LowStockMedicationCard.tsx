"use client";

import { useEffect, useState } from "react";

const LowStockMedicationsCard = () => {
  const [count, setCount] = useState<number | null>(null);

  const fetchLowStockMedications = async () => {
    try {
      const response = await fetch("/api/products/medlowquantity");
      const data = await response.json();

      if (data.count !== undefined) {
        setCount(data.count);
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (error) {
      console.error("Error fetching low stock medications:", error);
    }
  };

  useEffect(() => {
    fetchLowStockMedications();
  }, []);

  if (count === null) {
    return <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">Loading...</div>;
  }

  return (
    <div className="p-6 bg-yellow-200 text-gray-800 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Low Stock Medications</h3>
      <p className="text-3xl font-bold">{count} Medications</p>
      <p className="text-sm text-gray-600 mt-1">These medications have less than 20 units in stock.</p>
    </div>
  );
};

export default LowStockMedicationsCard;
