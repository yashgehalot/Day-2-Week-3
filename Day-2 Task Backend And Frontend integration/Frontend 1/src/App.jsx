import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import MyNavbar from './Components/MyNavbar';
import Home from './Components/Home';
import Footer from './Components/Footer';
import AddItem from './Components/Add Item';
import About from './Components/About';
import Product from './Components/New Product';

// --- NEW COMPONENT: Day 2 Task Form ---
const Day2TaskForm = () => {
  const [formData, setFormData] = useState({ username: '', email: '' });
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // NOTE: Ensure your backend is running on port 5000. 
      // If your backend is on 3000, change 5000 to 3000 below.
      const response = await fetch('http://localhost:3000/api/day2-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      
      if (response.ok) {
        setStatusMessage("Success: " + data.message);
        console.log("Response from Backend:", data);
      } else {
        setStatusMessage("Error: Could not add user.");
      }
    } catch (error) {
      console.error(error);
      setStatusMessage("Connection Failed. Check console.");
    }
  };

  return (
    <div className="card p-4 shadow-sm" style={{ maxWidth: '500px', margin: 'auto' }}>
      <h3 className="text-primary">Day 2: POST Data Task</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input 
            type="text" className="form-control" name="username" 
            value={formData.username} onChange={handleChange} required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input 
            type="email" className="form-control" name="email" 
            value={formData.email} onChange={handleChange} required 
          />
        </div>
        <button type="submit" className="btn btn-success w-100">Submit Data</button>
      </form>
      {/* Success Message for Screenshot */}
      {statusMessage && (
        <div className="alert alert-success mt-3" role="alert">
          <strong>{statusMessage}</strong>
        </div>
      )}
    </div>
  );
};
// ----------------------------------------

function App() {
  // 1. Navigation State
  const [activePage, setActivePage] = useState("home");

  // 2. Data State
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("expenseData");
    return saved ? JSON.parse(saved) : [];
  });

  // Day 1 Task State
  const [backendMessage, setBackendMessage] = useState("Connecting...");

  // Fetch Day 1 Data
  useEffect(() => {
    // Make sure this port matches your backend (5000 or 3000)
    fetch('http://localhost:3000/api/day1') 
      .then(response => response.json())
      .then(data => setBackendMessage(data.message))
      .catch(err => setBackendMessage("Backend not connected"));
  }, []);

  // Save to Local Storage
  useEffect(() => {
    localStorage.setItem("expenseData", JSON.stringify(items));
  }, [items]);

  // Handlers
  const handleAddItem = (newItem) => setItems([...items, newItem]);
  const handleDeleteItem = (id) => setItems(items.filter((item) => item.id !== id));
  const handleClearAll = () => { if (window.confirm('Delete all?')) setItems([]); };

  // Render Section
  const renderSection = () => {
    switch (activePage) {
      case "home": return <Home />;
      case "project": return <AddItem items={items} onAdd={handleAddItem} onDelete={handleDeleteItem} onClear={handleClearAll} />;
      case "product": return <Product />;
      case "about": return <About />;
      case "day2": return <Day2TaskForm />; // <--- New Page Case
      default: return <Home />;
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <MyNavbar onNavClick={setActivePage} />

      {/* --- DASHBOARD FOR TASKS --- */}
      <div className="container mt-3">
        <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded border">
          <div>
            <strong>Backend Status: </strong> 
            <span className={backendMessage.includes("Working") ? "text-success" : "text-danger"}>
              {backendMessage}
            </span>
          </div>
          {/* Button to open Day 2 Task */}
          <button 
            className="btn btn-primary" 
            onClick={() => setActivePage("day2")}
          >
            Go to Day 2 Task
          </button>
        </div>
      </div>
      {/* --------------------------- */}

      <main className="flex-grow-1 mt-4">
        {renderSection()}
      </main>

      <Footer />
    </div>
  );
}

export default App;