import React from "react";
import ClientLayout from './ClientLayout';

const RouteHandler: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ClientLayout>
      {children}           
    </ClientLayout>
  );
};

export default RouteHandler;