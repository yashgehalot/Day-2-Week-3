import React, { useState } from 'react';

const ItemCard = ({ item, onDelete }) => {
  // Interactive Feature: Toggle "Done"
  const [isDone, setIsDone] = useState(false);

  return (
    <div className={`list-group-item d-flex justify-content-between align-items-center ${isDone ? 'bg-light' : ''}`}>
      <div>
        <h5 className="mb-1" style={{ textDecoration: isDone ? 'line-through' : 'none', color: isDone ? '#aaa' : '#000' }}>
          {item.title}
        </h5>
        <span className="badge bg-secondary me-2">{item.category}</span>
        {/* Requirement: Props used correctly */}
      </div>
      
      <div className="d-flex align-items-center gap-2">
        <span className="fw-bold me-2">₹{item.value}</span>
        
        {/* Toggle Button */}
        <button 
           className={`btn btn-sm ${isDone ? 'btn-success' : 'btn-outline-secondary'}`}
           onClick={() => setIsDone(!isDone)}
        >
          {isDone ? '✓' : 'Done'}
        </button>

        {/* Delete Button */}
        <button 
          onClick={() => onDelete(item.id)} 
          className="btn btn-sm btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ItemCard;