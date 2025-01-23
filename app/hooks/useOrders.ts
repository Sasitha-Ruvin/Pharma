// useOrders.ts

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const useOrders = (searchQuery: string) => {
  const router = useRouter();
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/orders");
      const data = await response.json();

      const formattedData = data.map((order: any) => ({
        id: order.id,
        orderDate: new Date(order.orderDate).toLocaleDateString(),
        deliveryAddress: order.deliveryAddress,
        total: order.total,
        status: order.orderStatus,
        estDeliveryDate:new Date(order.estDeliveryDate).toLocaleDateString(),
        clientName: order.client?.name || "Unknown",
        clientEmail: order.client?.email || "",
        clientContact: order.client?.contact || "",
        userName: order.user?.name || "Unknown",
        medications: order.ordermedication.map((item: any) => ({
          scientificName: item.medication?.scientificName,
          quantity: item.quantity,
          price: item.price,
        })),
      }));

      setAllOrders(formattedData);
      setFilteredOrders(formattedData); // Initially set both allOrders and filteredOrders
    } catch (error) {
      console.error("Error fetching orders:", error);
      Swal.fire({
        title: "Error",
        text: "There was an issue fetching orders.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(); // Fetch orders on component mount
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredOrders(
        allOrders.filter((order) =>
          order.clientName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredOrders(allOrders); // If no search query, show all orders
    }
  }, [searchQuery, allOrders]); // Re-run when searchQuery or allOrders changes

  const handleDeleteOrder = async () => {
    if (!selectedOrderId) {
      Swal.fire("Error", "Please select an order to delete", "info");
      return;
    }

    Swal.fire({
      title: "Are you sure you want to delete this order?",
      text: "You will not be able to reverse this action",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleting...",
          text: "Please wait while removing the order",
          icon: "info",
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
        });

        try {
          // Send a DELETE request to the API
          const response = await fetch(`/api/orders/${selectedOrderId}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error("Failed to delete order");
          }

          Swal.fire({
            title: "Order Deleted",
            text: "The order has been deleted successfully.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            fetchOrders(); // Refresh order list after deletion
            setSelectedOrderId(null);
          });
        } catch (error) {
          console.error("Error deleting order:", error);
          Swal.fire({
            title: "Error",
            text: "There was an issue deleting the order.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  return {
    allOrders,
    filteredOrders,
    selectedOrderId,
    setSelectedOrderId,
    fetchOrders,
    handleDeleteOrder,
    loading
  };
};

export default useOrders;
