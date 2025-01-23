"use client";
import React from "react";
import { FaUser, FaChartLine, FaUsers, FaShoppingCart } from "react-icons/fa";
import EmployeeOrdersChart from "@/components/EmployeeOrderChart";
import SideBar from "@/components/SideBar";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const cards = [
    {
      title: "Employee Reports",
      icon: <FaUser size={24} />,
      bgColor: "bg-blue-500",
      navigateTo: "/analytics/employee-reports",
    },
    {
      title: "Sales Reports",
      icon: <FaChartLine size={24} />,
      bgColor: "bg-blue-400",
      navigateTo: "/analytics/sales-reports",
    },
    {
      title: "Client Reports",
      icon: <FaUsers size={24} />,
      bgColor: "bg-teal-500",
      navigateTo: "/analytics/client-reports",
    },
    {
      title: "Stock Reports",
      icon: <FaShoppingCart size={24} />,
      bgColor: "bg-blue-300",
      navigateTo: "/analytics/stock-reports",
    },
  ];

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="bg-[#F7F8FA] flex-1 p-8 overflow-y-auto">
      <div className="grid grid-cols-2 gap-8 items-center justify-center">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => router.push(card.navigateTo)}
              className={`${card.bgColor} flex flex-col items-center justify-center h-40 rounded-xl cursor-pointer shadow-lg hover:scale-105 transition-transform`}
            >
              <div className="text-white mb-2">{card.icon}</div>
              <h2 className="text-lg font-semibold text-white">{card.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
