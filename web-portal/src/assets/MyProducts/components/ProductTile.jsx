import { useState } from "react";
import { useSas } from "../../global/components/SasProvider.jsx";
import "../styles/myProductsPage.css";
import { ChangePriceAPI, RemoveProductsAPI } from "../../apiConsumer/productsAPI.js";
import { FaEdit, FaSave, FaTrash } from "react-icons/fa";

export function ProductTile({ item, setItems }) {
  const sasToken = useSas();
  const [editState, setEditState] = useState(false);
  const [price, setPrice] = useState(item.unitPrice);

  async function handleSave() {
    setEditState(false);
    await ChangePriceAPI({ id: item.id, unitPrice: price });
    item.unitPrice = price;
    setItems((prev) => ({ ...prev, [item.id]: item }));
  }
  async function handleDelete() {
    await RemoveProductsAPI({ id: item.id });
    setItems((prev) => {
      const { [item.id]: removed, ...others } = prev;
      return others;
    });
  }
  return (
    <div className="productTile">
      <img className="productImage" src={`${item.imageUrl}?${sasToken}`} alt={item.name} />
      <div className="productTileInfo">
        <label className="productName">{item.name}</label>
        <div className="text-left flex items-center">
          <span>price:</span>
          
          {!editState ? (
            <label className="productPrice">₹{price}</label>
          ) : (
            <input className="priceInput" value={price} onChange={(e) => setPrice(e.target.value)} />
          )}
        </div>

        <div className="actionButtons">
          {!editState ? (
            <button className="recordButton editBtn" onClick={() => setEditState(true)}>
              <FaEdit className="recordIcon" />
            </button>
          ) : (
            <button className="recordButton saveBtn" onClick={handleSave}>
              <FaSave className="recordIcon" />
            </button>
          )}

          <button className="recordButton deleteBtn" onClick={handleDelete}>
            <FaTrash className="recordIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}
