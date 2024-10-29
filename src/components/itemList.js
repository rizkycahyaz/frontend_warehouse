import React from 'react';

const ItemList = ({ items, onDelete }) => {
  if (!Array.isArray(items)) {
    return <p>No items available</p>;
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.name} - {item.quantity}
          <button onClick={() => onDelete(item.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
