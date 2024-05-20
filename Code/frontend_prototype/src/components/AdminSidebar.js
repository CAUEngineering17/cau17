import React from 'react';
import { Link } from 'react-router-dom';
import './SidebarAdmin.css';

const AdminSidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li><Link to="/admin/settings">Settings</Link></li>
        <li><Link to="/admin/users">Users</Link></li>
        <li><Link to="/admin/authority">Authority</Link></li>
      </ul>
    </nav>
  );
};

export default AdminSidebar;