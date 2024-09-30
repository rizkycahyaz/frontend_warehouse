import React from 'react';

const ItemDetails = ({ item }) => {
  if (!item) return null;

  return (
    <div className="item-details">
      <h3>{item.name}</h3>
      <p><strong>Quantity:</strong> {item.quantity}</p>
      <p><strong>Description:</strong> {item.description}</p>
    </div>
  );
};

export default ItemDetails;