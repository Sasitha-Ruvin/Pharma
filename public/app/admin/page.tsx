'use client';
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { ClipLoader } from "react-spinners";
import LoginSide from "@/components/LoginSide";
import roleRedirectMap from "@/utils/roleRoutes";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    Object.values(roleRedirectMap).forEach((path) => {
      router.prefetch(path); 
    });
  }, [router]);


  const handleLogin = useCallback(async () =>{
    setLoading(true);
    setError("");
    try {
        const response = await fetch('/api/admin',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email,password}),
        });

        if(response.ok){
            const {token} = await response.json();
            Cookies.set('authToken',token,{expires:1});

            const { role } = JSON.parse(atob(token.split('.')[1]));
            const redirectTo = roleRedirectMap[role];

            if(role === "Admin"){
                router.push('/users/index');
            }
        } else{
            setError("Invalid Credentials")
        }
        
    } catch (error) {
        setError("An error occurred. Please try again.");
        
    }
    finally{
        setLoading(false);
    }
  },[email,password,router]);
  return (
    <div className="flex h-screen">

        <LoginSide/>

        <div className="flex-1 flex items-center justify-center p-8 bg-white">
            <div className="w-full max-w-md space-y-6">
                <h2 className="text-center text-3xl font-semibold text-gray-800">Admin Login</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}

                    <input
                    type="text"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mt-4 border rounded-md bg-gray-200 text-black"
                    />
                    <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mt-4 border rounded-md bg-gray-200 text-black"
                    />
                    <button
                    onClick={handleLogin}
                    className="w-full bg-blue-900 text-white py-3 mt-4 rounded-md hover:bg-blue-800 transition relative"
                    disabled={loading}
                    >
                    {loading ? (
                        <div className="flex justify-center">
                        <ClipLoader size={20} color="#fff" loading={loading} />
                        </div>
                    ) : (
                        "Login"
                    )}
                    </button>
            </div>

        </div>

    </div>
  )
}

export default page