"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams, useRouter } from "next/navigation";
import SideBar from "@/components/SideBar";
import CustomTextField from "@/components/ui/CustomTextField";
import { Button, TextField } from "@mui/material";

interface ClientFormData {
  name: string;
  email: string;
  type: string;
  contact: string;
  contractType: string;
  paymentMethod: string;
  tier: string;
  addresses: string[];
}

const UpdateClientForm = () => {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState<ClientFormData>({
    name: "",
    email: "",
    type: "",
    contact: "",
    contractType: "",
    paymentMethod: "",
    tier: "",
    addresses: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchClient = async () => {
    try {
      const response = await fetch(`/api/customers/${id}`);
      const client = await response.json();
  
      if (response.ok) {
        setFormData({
          name: client.name || "",
          email: client.email || "",
          type: client.type || "",
          contact: client.contact || "",
          contractType: client.contractType || "",
          paymentMethod: client.paymentMethod || "",
          tier: client.tier || "",
          addresses: client.clientaddress?.map((addr: { address: string }) => addr.address) || [],
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: client.error,
        });
      }
    } catch (error) {
      console.error("Error Fetching Client: ", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch client data.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    fetchClient();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddressChange = (index: number, value: string) => {
    const updatedAddresses = [...formData.addresses];
    updatedAddresses[index] = value;
    setFormData({ ...formData, addresses: updatedAddresses });
  };

  const addAddress = () => {
    setFormData({ ...formData, addresses: [...formData.addresses, ""] });
  };

  const removeAddress = (index: number) => {
    const updatedAddresses = formData.addresses.filter((_, i) => i !== index);
    setFormData({ ...formData, addresses: updatedAddresses });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/customers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Client Updated Successfully",
        });
        router.push("/customers/index");
      } else {
        const { error } = await response.json();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error,
        });
      }
    } catch (error) {
      console.error("Error Updating Client: ", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="bg-[#F7F8FA] flex-1 p-8">
        <h2 className="text-2xl font-bold mb-4 text-black">Update Client</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <CustomTextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
            />
            <CustomTextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
            />
            <CustomTextField
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              variant="outlined"
            />
            <CustomTextField
              label="Contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              variant="outlined"
            />
            <CustomTextField
              label="Contract Type"
              name="contractType"
              value={formData.contractType}
              onChange={handleChange}
              variant="outlined"
            />
            <CustomTextField
              label="Tier"
              name="tier"
              value={formData.tier}
              onChange={handleChange}
              variant="outlined"
            />
            <div className="col-span-2">
              {formData.addresses.map((address, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <TextField
                    label={`Address ${index + 1}`}
                    value={address}
                    onChange={(e) => handleAddressChange(index, e.target.value)}
                    fullWidth
                  />
                  <Button
                    onClick={() => removeAddress(index)}
                    variant="outlined"
                    color="secondary"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button onClick={addAddress} variant="outlined">
                Add
              </Button>
            </div>
          </div>
          <Button id="save-changes-button" color="primary" variant="contained" className="mt-6" type="submit">
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateClientForm;
