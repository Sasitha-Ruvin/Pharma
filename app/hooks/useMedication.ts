import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const useMedications = (searchQuery: string) => {
  const [allMedications, setAllMedications] = useState<any[]>([]);
  const [filteredMedications, setFilteredMedications] = useState<any[]>([]);
  const [selectedMedicationId, setSelectedMedicationId] = useState<string | null>(null);

  const fetchMedications = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      
      const formattedData = data.medications.map((medication: any) => ({
        id: medication.id,
        name: medication.medicationName.name, 
        scientificName:medication.scientificName,
        expiration: medication.expireDate, 
        batchcode:medication.batchCode,
        quantity: medication.amount, 
        price:medication.pricePerUnit,
        ingredients: medication.ingredients, 
        directions: medication.handlingInstructions, 
        sideEffect: medication.sideEffects, 
        warning:medication.warnings,
        arrival:medication.arrivalDate,
        supplierId: medication.supplierId,
        shelf: medication.shelfAddress, 
        storetemp: medication.storetemp, 
      }));

      console.log(formattedData);
      setAllMedications(formattedData);
      setFilteredMedications(formattedData);
    } catch (error) {
      console.error("Error Fetching Medications", error);
    }
  };
  

  useEffect(() => {
    fetchMedications();
  }, []);

  // Search Functionality
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredMedications(allMedications);
    } else {
      setFilteredMedications(
        allMedications.filter(medication =>
          medication.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, allMedications]);

  const handleDelete = async () => {
    if (!selectedMedicationId) {
      Swal.fire("Error", "Select a Medication to Remove", "info");
      return;
    }

    // Show confirmation dialog before deletion
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this medication!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Perform delete request
          const response = await fetch(`/api/products/${selectedMedicationId}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error("Failed to delete the medication");
          }

          Swal.fire({
            title: "Medication Deleted",
            text: "The medication has been deleted successfully.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            // Reload the medications after deletion
            fetchMedications();
            setSelectedMedicationId(null);
          });
        } catch (error) {
          console.error("Error Deleting Medication:", error);
          Swal.fire({
            title: "Error",
            text: "There was an issue deleting the medication.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  return {
    allMedications,
    filteredMedications,
    selectedMedicationId,
    setSelectedMedicationId,
    handleDelete
  };
};


export default useMedications;