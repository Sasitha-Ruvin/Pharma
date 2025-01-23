"use client";

import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import { useRouter, useParams } from "next/navigation";
import Swal from "sweetalert2";
import SideBar from "@/components/SideBar";
import CustomTextField from "@/components/ui/CustomTextField";

const page = () => {
    const router = useRouter();
    const params = useParams();
    const [formData, setFormData] = useState({
        notes: "",
        deliveryAddress: "",
        orderStatus: "",
        estDeliveryDate: "",
    });

    // Fetch order details
    const fetchOrder = async () => {
        try {
            const response = await fetch(`/api/orders/${params.id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch Order");
            }
            const order = await response.json();
            setFormData({
                notes: order.notes || "",
                deliveryAddress: order.deliveryAddress || "",
                orderStatus: order.orderStatus || "",
                estDeliveryDate: order.estDeliveryDate
                    ? order.estDeliveryDate.split("T")[0]
                    : "",
            });
        } catch (error) {
            console.log("Error Fetching Order", error);
            Swal.fire("Error", "Failed to Fetch Order Details", "error");
        }
    };

    useEffect(() => {
        if (params.id) {
            fetchOrder();
        }
    }, [params?.id]);

    // Handle form field changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        // Sanitize formData before sending
        const sanitizedData: any = { ...formData };
        if (!sanitizedData.estDeliveryDate || sanitizedData.estDeliveryDate === "") {
            delete sanitizedData.estDeliveryDate; // Remove invalid date
        }

        try {
            const response = await fetch(`/api/orders/${params.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sanitizedData),
            });

            if (!response.ok) throw new Error("Failed to Update Order");

            Swal.fire("Success", "Order Updated Successfully", "success");
            router.push("/orders/index");
        } catch (error) {
            console.log("Error Updating Order", error);
            Swal.fire("Error", "Failed to Update Order", "error");
        }
    };

    return (
        <div className="flex h-screen">
            <SideBar />
            <div className="bg-[#F7F8FA] flex-1 p-8">
                <h2 className="text-2xl font-bold mb-4 text-black">Update Order</h2>
                <div className="grid grid-cols-2 gap-4">
                    <form onSubmit={handleUpdate} className="space-y-6">
                        <CustomTextField
                            label="Delivery Address"
                            name="deliveryAddress"
                            value={formData.deliveryAddress}
                            onChange={handleChange}
                            variant="outlined"
                        />
                        <TextField
                            label="Estimated Delivery Date"
                            type="date"
                            name="estDeliveryDate"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                            value={formData.estDeliveryDate}
                        />
                        <CustomTextField
                            label="Notes"
                            name="notes"
                            value={formData.notes}
                            variant="outlined"
                            onChange={handleChange}
                            multiline
                            rows={4}
                            fullWidth
                        />
                        <CustomTextField
                            label="Order Status"
                            name="orderStatus"
                            value={formData.orderStatus}
                            onChange={handleChange}
                            variant="outlined"
                        />
                        <Button type="submit" variant="contained" color="primary" className="mt-6">
                            Update
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default page;
