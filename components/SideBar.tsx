import React, { useState, useEffect } from 'react';
import SideBarLinkButton from './ui/SideBarLinkButton';
import ActionButton from './ui/ActionButton';

const SideBar = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userStatus, setUserStatus] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false); // Track if data is loaded

  useEffect(() => {
    // Fetch session data only on the client
    setUserName(sessionStorage.getItem('name'));
    setUserRole(sessionStorage.getItem('role'));
    setUserStatus(sessionStorage.getItem('status'));
    setIsLoaded(true); // Mark as loaded after fetching data
  }, []);

  const isButtonEnabled = (allowedRoles: string[]) => {
    return allowedRoles.includes(userRole || '');
  };

  // Render a loader or fallback UI while session data is loading
  if (!isLoaded) {
    return (
      <div className="bg-[#20252C] text-white w-1/4 p-6 flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
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
              <SideBarLinkButton href="/users/index" label="Employee Management" />
            )}
          </li>
          <li className="mb-4">
            {isButtonEnabled(['Inventory Manager', 'Warehouse Employee', 'Chief Operating Officer', 'Admin']) && (
              <SideBarLinkButton href="/products/index" label="Product Management" />
            )}
          </li>
          <li className="mb-4">
            {isButtonEnabled(['Sales Employee', 'Warehouse Employee', 'Chief Operating Officer', 'Admin']) && (
              <SideBarLinkButton href="/orders/index" label="Orders Management" />
            )}
          </li>
          <li className="mb-4">
            {isButtonEnabled(['Inventory Manager', 'Chief Operating Officer', 'Admin']) && (
              <SideBarLinkButton href="/suppliers/index" label="Supplier Management" />
            )}
          </li>
          <li className="mb-4">
            {isButtonEnabled(['Sales Employee', 'Chief Operating Officer', 'Admin']) && (
              <SideBarLinkButton href="/clients/index" label="Client Management" />
            )}
          </li>
          <li className="mb-4">
            {userStatus === 'Trainee' && (
              <SideBarLinkButton href="/resourcehub/index" label="Resource Hub" />
            )}
          </li>
          <li className="mb-4">
            {isButtonEnabled(['Chief Operating Officer', 'Admin']) && (
              <SideBarLinkButton href="/analytics/index" label="Analytics" />
            )}
          </li>
        </ul>
      </div>

      {/* Log Out Button */}
      <div className="mt-4">
        <ActionButton isLogout={true} />
      </div>
    </div>
  );
};

export default SideBar;
