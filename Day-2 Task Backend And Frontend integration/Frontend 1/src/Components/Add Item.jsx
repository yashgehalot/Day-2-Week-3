import React, { useState } from 'react';
import ItemCard from './ItemCard'; // This will work now that you created the file above

const AddItem = ({ items, onAdd, onDelete, onClear }) => {
  
  const [formData, setFormData] = useState({ title: '', category: '', value: '' });
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState(''); 
  const [msgType, setMsgType] = useState('success'); // To change color (green/red)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.value) {
      setError('All fields are required!');
      return;
    }
    
    // 1. Add Data
    onAdd({ id: Date.now(), ...formData });
    
    // 2. Show Success Message (Green)
    setMsgType('success');
    setSuccessMsg('Item added successfully! ✅');
    setTimeout(() => setSuccessMsg(''), 3000);
    
    setFormData({ title: '', category: '', value: '' });
  };

  // Wrapper to show "Deleted" message
  const handleDeleteWrapper = (id) => {
    onDelete(id);
    setMsgType('danger'); // Red color for delete
    setSuccessMsg('Item deleted successfully! 🗑️');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Expense Project</h2>

      <div className="row">
        {/* --- LEFT SIDE: FORM --- */}
        <div className="col-md-5">
          <div className="card shadow-sm p-4">
            <h4 className="mb-3">Add New Item</h4>
            {error && <div className="alert alert-danger p-2">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input type="text" name="title" className="form-control" placeholder="Title" value={formData.title} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <select name="category" className="form-select" value={formData.category} onChange={handleChange}>
                  <option value="">Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-3">
                <input type="number" name="value" className="form-control" placeholder="Amount" value={formData.value} onChange={handleChange} />
              </div>
              <button type="submit" className="btn btn-success w-100">Add Item</button>
            </form>
          </div>
        </div>

        {/* --- RIGHT SIDE: LIST --- */}
        <div className="col-md-7">
          
          {/* --- MESSAGE IS NOW HERE (RIGHT SIDE) --- */}
          {successMsg && (
            <div className={`alert alert-${msgType} p-2 mb-3 shadow-sm text-center`}>
               {successMsg}
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Your List ({items.length})</h4>
            {items.length > 0 && (
              <button onClick={onClear} className="btn btn-outline-danger btn-sm">Clear All</button>
            )}
          </div>

          <div className="list-group">
            {items.length === 0 ? <p className="text-muted text-center">No items yet.</p> : null}
            {items.map((item) => (
               <ItemCard key={item.id} item={item} onDelete={handleDeleteWrapper} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;