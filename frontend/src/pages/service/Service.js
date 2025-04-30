import React from "react";
import { FaPlus } from "react-icons/fa";
import "../../assets/styles/Service.css";

const Kitchen = () => {
  const items = [
    { id: 1, name: "Piring", category: "S", stock: 50 },
    { id: 2, name: "Sendok", category: "S", stock: 100 },
    { id: 3, name: "Gelas", category: "S", stock: 75 },
    { id: 4, name: "Tisu Toilet", category: "S", stock: 22 },
  ];

  const handleAddItem = () => {
    console.log("Tambah barang baru");
  };

  return (
    <div>
      <div className="kitchen-page">
        <h1>Service Inventory</h1>
        <table className="kitchen-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama Barang</th>
              <th>Kategori</th>
              <th>Stok</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Input Button */}
      <button className="floating-button" onClick={handleAddItem}>
        <FaPlus size={20} />
      </button>
    </div>
  );
};

export default Kitchen;