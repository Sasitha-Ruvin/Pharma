"use client"
import React, { useState, useEffect } from 'react';
import SideBarLinkButton from './ui/SideBarLinkButton';
import ActionButton from './ui/ActionButton';
import Cookies from 'js-cookie'
import {jwtDecode} from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { CircularProgress, Backdrop } from '@mui/material';

const SideBar = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userStatus, setUserStatus] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('authToken');

    if(token){
      const decodedToken:{name:string; role:string; status:string} = jwtDecode(token);
      setUserName(decodedToken.name);
      setUserRole(decodedToken.role);
      setUserStatus(decodedToken.status);
    }
  }, []);

  const isButtonEnabled = (allowedRoles: string[]) => {
    return allowedRoles.includes(userRole || '');
  };

  const handleNavigation = (path: string) => {
    if (window.location.pathname === path) {
   
      setIsNavigating(false);
      return;
    }
    setIsNavigating(true); 
    router.push(path); 
  };

  const getCurrentPath = (path:string) =>{
    return window.location.pathname == path ? 'bg-blue-500':"";
  }
  



  return (
    <div className="bg-[#20252C] text-white w-1/4 p-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center mb-6">
          <div className="mr-4"></div>
          <div>
            <h3 className="text-xl font-bold">{userName || 'User'}</h3>
            <p className="text-sm text-[#FCD43B]">{userRole || 'Manager'}</p>
          </div>
        </div>

        {/* Navigation */}
        <ul>
          <li className="mb-4">
            {isButtonEnabled(['HR Manager', 'Chief Operating Officer', 'Admin']) && (
              <SideBarLinkButton href="/users/index" label="Employee Management" onClick={() => handleNavigation('/users/index')} 
                activeClass={getCurrentPath('/users/index')}
              />
            )}
          </li>
          <li className="mb-4">
            {isButtonEnabled(['Inventory Manager', 'Warehouse Employee', 'Chief Operating Officer', 'Admin']) && (
              <SideBarLinkButton href="/products/index" label="Product Management" onClick={() => handleNavigation('/products/index')}
              activeClass={getCurrentPath('/products/index')}              
              />
            )}
          </li>
          <li className="mb-4">
            {isButtonEnabled(['Sales Employee', 'Warehouse Employee', 'Chief Operating Officer', 'Admin']) && (
              <SideBarLinkButton href="/orders/index" label="Orders Management" onClick={() => handleNavigation('/orders/index')}
                activeClass={getCurrentPath('/orders/index')}
              />
            )}
          </li>
          <li className="mb-4">
            {isButtonEnabled(['Inventory Manager', 'Chief Operating Officer', 'Admin']) && (
              <SideBarLinkButton href="/suppliers/index" label="Supplier Management" onClick={() => handleNavigation('/suppliers/index')}
               activeClass={getCurrentPath('/suppliers/index')}
              />
            )}
          </li>
          <li className="mb-4">
            {isButtonEnabled(['Sales Employee', 'Chief Operating Officer', 'Admin']) && (
              <SideBarLinkButton href="/customers/index" label="Client Management" onClick={()=> handleNavigation('/customers/index')}
                activeClass={getCurrentPath('/customers/index')}
              />
            )}
          </li>
          <li className="mb-4">
            {userStatus === 'Trainee' && (
              <SideBarLinkButton href="/resourcehub/index" label="Resource Hub" onClick={()=> handleNavigation('/resourcehub/index')}
                activeClass={getCurrentPath('/resourcehub/index')}
              />
            )}
          </li>
          <li className="mb-4">
            {isButtonEnabled(['Chief Operating Officer', 'Admin']) && (
              <SideBarLinkButton href="/analytics/index" label="Analytics" onClick={() => handleNavigation('/analytics/index')} 
                activeClass={getCurrentPath('/analytics/index')}
              />
            )}
          </li>
        </ul>
      </div>

      {/* Log Out Button */}
      <div className="mt-4">
        <ActionButton isLogout={true} />
      </div>

      <Backdrop sx={{color:'#fff', zIndex:(theme)=>theme.zIndex.drawer + 1}} open={isNavigating}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  );
};

export default SideBar;
