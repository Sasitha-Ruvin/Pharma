"use client";

import { useEffect, useState } from "react";

const ExpiringMedicationsCard = () => {
  const [count, setCount] = useState<number | null>(null);

  const fetchExpiringMedications = async () => {
    try {
      const response = await fetch("/api/medicationexpire");
      const data = await response.json();
      
      if (data.count !== undefined) {
        setCount(data.count);
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (error) {
      console.error("Error fetching expiring medications:", error);
    }
  };

  useEffect(() => {
    fetchExpiringMedications();
  }, []);

  if (count === null) {
    return <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">Loading...</div>;
  }

  return (
    <div className="p-6 bg-red-200 text-gray-800 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Medications Expiring Soon</h3>
      <p className="text-3xl font-bold">{count} Medications</p>
      <p className="text-sm text-gray-600 mt-1">These medications are expiring within the next month.</p>
    </div>
  );
};

export default ExpiringMedicationsCard;
