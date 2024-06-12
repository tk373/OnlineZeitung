import React from 'react';

const Layout = ({ children }) => {
  return (
      <div className='layoutContainer' style={{ width: '80vw', margin: '0 auto', backgroundColor: 'var(--background)', minHeight: "100%"}}>
      {children}
      </div>
  );
};

export default Layout;