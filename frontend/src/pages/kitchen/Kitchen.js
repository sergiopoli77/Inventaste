import React from "react";
import { FaPlus } from "react-icons/fa";
import "../../assets/styles/Kitchen.css";

const Kitchen = () => {
  const items = [
    { id: 1, name: "Salmon", category: "K", stock: 88 },
    { id: 2, name: "Babi", category: "K", stock: 72 },
    { id: 3, name: "Wagyu A5", category: "K", stock: 75 },
  ];

  const handleAddItem = () => {
    console.log("Tambah barang baru");
  };

  return (
    <div>
      <div className="kitchen-page">
        <h1>Kitchen Inventory</h1>
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