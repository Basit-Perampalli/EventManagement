
import React from 'react';
import TopNavBar from './TopNavBar'; 
import '../App.css';

const Layout = ({ children }) => {
  return (
    <div>
      <TopNavBar />
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
