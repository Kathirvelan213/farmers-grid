import "../styles/myProductsPage.css";
import { useState, useEffect } from "react";
import { getProductsAPI } from "../../apiConsumer/productsAPI.js";
import { getMyProductsAPI } from "../../apiConsumer/productsAPI.js";
import { AddProductsAPI } from "../../apiConsumer/productsAPI.js";
import { MoreProductsPanel } from "./MoreProductsPanel.jsx";
import { SearchPanel } from "../../global/components/SearchPanel.jsx";
import { ProductsGallery } from "./ProductsGallery.jsx";
import { Modal } from "../../global/components/Modal.jsx";

export function MyProductsPanel() {
  const [allProducts, setAllProducts] = useState({});
  const [myProducts, setMyProducts] = useState({});
  const [moreProducts, setMoreProducts] = useState({});
  const [insertState, setInsertState] = useState(false);
  const [deleteState, setDeleteState] = useState(false);
  const [toInsert, setToInsert] = useState(null);
  const [newPrice, setNewPrice] = useState();

  const handleAddProduct = () => {
    setInsertState(true);
    setToInsert(null);
  };
  var allProductsDict = {};
  useEffect(() => {
    const getProducts = async () => {
      try {
        const result = await getProductsAPI();
        allProductsDict = Object.fromEntries(result.data.map((product) => [product.id, product]));
        setAllProducts(allProductsDict);
      } catch (e) {
        console.error(e);
      }
    };

    const getMyProducts = async () => {
      try {
        const result = await getMyProductsAPI();
        setMyProducts(Object.fromEntries(result.data.map((product) => [product.id, product])));
      } catch (e) {
        console.error(e);
      }
    };

    getProducts();
    getMyProducts();
  }, []);

  useEffect(() => {
    const myProductIds = new Set(Object.values(myProducts).map((product) => product.productId));
    setMoreProducts(Object.fromEntries(Object.entries(allProducts).filter(([productId]) => !myProductIds.has(Number(productId)))));
  }, [myProducts]);

  async function handleInsert() {
    setInsertState(false);
    try {
      var insertObj = {
        productId: parseInt(toInsert.id),
        unitPrice: newPrice,
      };
      const newRowId = await AddProductsAPI(insertObj);
      setMyProducts((prev) => ({ ...prev, [insertObj.productId]: { ...toInsert, ["unitPrice"]: newPrice, ["id"]: newRowId.data } }));
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      <SearchPanel
        items={Object.values(myProducts)}
        filterKey={"name"}
        DisplayComponent={ProductsGallery}
        displayComponentProps={{ keyField: "id", setItems: setMyProducts }}
        extraProps={[
          {
            Item: AddProductButton,
            props: {
              onClick: handleAddProduct,
              insertState: insertState,
            },
          },
        ]}></SearchPanel>

      <Modal isOpen={insertState} onClose={() => setInsertState(false)}>
        {insertState && (
          <MoreProductsPanel
            items={Object.values(moreProducts)}
            setToInsert={setToInsert}
            toInsert={toInsert}
            onCancel={() => setInsertState(false)}
            onAdd={handleInsert}
            newPrice={newPrice}
            setNewPrice={setNewPrice}
          />
        )}
      </Modal>
    </div>
  );
}

function AddProductButton({ onClick, insertState }) {
  return !insertState && <button onClick={onClick}>Add</button>;
}
