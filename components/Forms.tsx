"use client";

import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import Select from "react-select";
import CustomTextField from "./ui/CustomTextField";
import Swal from "sweetalert2";
import { validateForm } from "@/utils/validations";

interface Field {
  name: string;
  label: string;
  type?: string;
  options?: { value: string; label: string }[]; 
}

interface FormComponentProps {
  fields: Field[];
  initialValues: Record<string, any>;
  onSubmit: (formData: Record<string, any>) => void;
  customStyles?: any;
  title: string;
}

const Forms = ({
  fields,
  initialValues,
  onSubmit,
  customStyles,
  title,
}: FormComponentProps) => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, selectedOption: any) => {
    setFormData({
      ...formData,
      [name]: selectedOption.value,
    });
  };

  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateForm(fields, formData);

    if(!validation.valid){
        Swal.fire({
            title:"Validation Error",
            text:validation.message,
            icon:'error',
            confirmButtonText:"OK",
        });
        return;
    }

    onSubmit(formData);
    console.log("Form Data Submitted:", formData);
    
  };

  const customSelectStyles = {
    control: (provided: any) => ({
      ...provided,
      minHeight: "56px",
      fontSize: "16px",
      color: "black",
      borderColor: "#c4c4c4",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "black",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#757575",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      color: "black",
      backgroundColor: state.isSelected ? "#e0e0e0" : "white",
      "&:hover": {
        backgroundColor: "#f5f5f5",
      },
    }),
  };

  return (
    <div className="bg-[#F7F8FA] flex-1 p-8">
      <h2 className="text-2xl font-bold mb-4 text-black">{title}</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          {fields.map((field) => {
            if (field.options) {
              return (
                <Select
                  key={field.name}
                  instanceId={`form-${field.name}`}
                  options={field.options}
                  onChange={(option) => handleSelectChange(field.name, option)}
                  placeholder={field.label}
                  className="w-full"
                  styles={customSelectStyles}
                  value={field.options.find(
                    (opt) => opt.value === formData[field.name]
                  )}
                />
              );
            }
            if (field.type === "date") {
              return (
                <TextField
                  key={field.name}
                  label={field.label}
                  fullWidth
                  variant="outlined"
                  name={field.name}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  onChange={handleChange}
                  value={formData[field.name]}
                />
              );
            }
            return (
              <CustomTextField
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type || "text"}
                onChange={handleChange}
                value={formData[field.name]}
              />
            );
          })}
        </div>
        <button
          color="primary"
          className="mt-6 text-white bg-blue-600 font-bold p-2 rounded-lg w-24 hover:bg-blue-400 cursor-pointer transition-all duration-150"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Forms;
