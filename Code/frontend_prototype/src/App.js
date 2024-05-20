import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Admin from './components/Admin';
import NewIssue from './components/NewIssue';
import ViewIssues from './components/ViewIssues';
import IssueDetail from './components/ViewIssueDetail';
import './App.css';

const App = () => (
  <Router>
    <div className="app">
      <Header />
      <Routes>
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/new-issue/*" element={<NewIssue />} />
        <Route path="/view-issues/*" element={<ViewIssues />} />
        <Route path="/view-issues/:id" element={<IssueDetail />} />
        {/* Default route or other routes can go here */}
      </Routes>
    </div>
  </Router>
);

export default App;
