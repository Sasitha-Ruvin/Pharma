// utils/roleRedirectMap.ts
const roleRedirectMap: Record<string, string> = {
    // "Admin": "/users/index",
    "HR Manager": "/users/index",
    "Inventory Manager": "/suppliers/index",
    "Sales Employee": "/orders/index",
    "Warehouse Employee": "/products/index",
    "Chief Operating Officer": "/analytics/index",
  };
  
  export default roleRedirectMap;
  