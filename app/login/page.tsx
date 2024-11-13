'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import axios from "axios";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { ClipLoader } from "react-spinners"; 
import logo from '../../public/logo.jpg'
import Image from "next/image";

export default function Login() {
  const [role, setRole] = useState<string>(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 
  const [redirecting, setRedirecting] = useState(false);
  const [status, setStatus] = useState<string>("");

  const handleLogin = async () => {
    if (!role || !status) {
      setError("Please select both role and status before logging in.");
      return;
    }
    setLoading(true); // Start loading
    setError(""); // Clear any previous errors
    try {
      const response = await axios.post("/api/login", { role, email, password, status });
      if (response.status === 200) {
        const userRole = response.data.role;
        const userName = response.data.name;
        const userStatus = response.data.status;

        // Save role and name in session storage
        sessionStorage.setItem("role", userRole);
        sessionStorage.setItem("name", userName);
        sessionStorage.setItem('status',userStatus);

        // Role-based redirects mapping
        const roleRedirectMap: Record<string, string> = {
          "admin": "/dashboard",
          "HR Manager": "/users/index",
          "Inventory Manager": "/suppliers/index",
          "Sales Employee": "/orders/index",
          "Warehouse Employee": "/products/index",
          "Trainee": "resourcehub/index",
          "Chief Operating Officer": "/users/index",
        };

        const redirectTo = roleRedirectMap[userRole];

        if (redirectTo) {
          setRedirecting(true); // Indicate the redirect is happening
          await router.push(redirectTo); // Wait for the redirection to complete
        } else {
          setError("Invalid User Role");
        }
      }
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setLoading(false); // Stop loading
      if (!redirecting) {
        setRedirecting(false); // Reset redirecting in case of error
      }
    }
  };

  useEffect(() => {
    if (redirecting) {
      // Wait for the redirect to complete before resetting loading state
      setLoading(false);
    }
  }, [redirecting]);

  return (
    <div className="flex h-screen">
      {/* Left section */}
      <div className="flex-1 flex flex-col items-center justify-center bg-teal-700 text-white p-8">
        <div className="w-32 h-32 bg-gray-300 rounded-md mb-4">
          <Image src={logo} alt="Logo" className="w-32 h-32" />
        </div>
        <h1 className="text-4xl font-bold">PharmaSys</h1>
        <p className="text-lg mt-2">Your Health, Our Priority</p>
      </div>

      {/* Right section */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-center text-3xl font-semibold text-gray-800">Welcome Back!</h2>
          <p className="text-center text-gray-500 mb-4">
            Please select your role and enter valid credentials to proceed
          </p>

          <Dropdown>
            <DropdownTrigger>
              <button className="w-full p-3 border rounded-md text-black bg-white text-center">
                {role ? role.charAt(0).toUpperCase() + role.slice(1) : "Please Select Your Role"}
              </button>
            </DropdownTrigger>
            <DropdownMenu
              onAction={(key) => setRole(String(key))}
            >
              <DropdownItem key="Chief Operating Officer" className="text-black">Chief Operating Officer</DropdownItem>
              <DropdownItem key="Inventory Manager" className="text-black" >Inventory Manager</DropdownItem>
              <DropdownItem key="Sales Employee" className="text-black">Sales Employee</DropdownItem>
              <DropdownItem key="HR Manager" className="text-black">HR Manager</DropdownItem>
              <DropdownItem key="Warehouse Employee" className="text-black">Warehouse Employee</DropdownItem>
              <DropdownItem key="Trainee" className="text-black">Trainee</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          {/* Role Dropdown */}
          <Dropdown>
            <DropdownTrigger>
              <button className="w-full p-3 border rounded-md text-black bg-white text-center">
                {status ? status : "Please Select Your Status"}
              </button>
            </DropdownTrigger>
            <DropdownMenu onAction={(key) => setStatus(String(key))}>
              <DropdownItem key="Permanent" className="text-black">Permanent</DropdownItem>
              <DropdownItem key="Trainee" className="text-black">Trainee</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <input
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-md bg-gray-200 text-black focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-md bg-gray-200 text-black focus:outline-none"
          />

          

          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Login button*/}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-900 text-white py-3 rounded-md hover:bg-blue-800 transition relative"
            disabled={loading || redirecting} // Disable during loading or redirecting
          >
            {loading || redirecting ? (
              <div className="absolute inset-0 flex justify-center items-center">
                <ClipLoader size={25} color="#fff" loading={loading || redirecting} />
              </div>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
