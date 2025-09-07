import { MoreProductsGallery } from "./MoreProductsGallery.jsx"
import { SearchPanel } from "../../global/components/SearchPanel.jsx"
import { StageProductPanel } from "./StageProductPanel.jsx"

export function MoreProductsPanel({ items, setToInsert, toInsert, onCancel, onAdd, setNewPrice, newPrice }) {
    console.log(items)
    return (
        <div className="grid grid-cols-[2fr_1fr] h-full">
            <div className="overflow-auto">
                <SearchPanel
                    items={items}
                    filterKey={"name"}
                    DisplayComponent={MoreProductsGallery}
                    displayComponentProps={{ onClick: setToInsert, keyField: "id" }}
                />
            </div>

            <div className="flex flex-col h-full border-l border-gray-200">
                <div className="p-4 border-b border-gray-200 font-semibold">Add New Product</div>
                <div className="p-4 overflow-auto flex-1">
                    <StageProductPanel item={toInsert} setNewPrice={setNewPrice} newPrice={newPrice}/>
                </div>
                <div className="p-4 flex gap-2 border-t border-gray-200">
                    <button onClick={onCancel}>Cancel</button>
                    <button onClick={onAdd} disabled={!toInsert}>Add</button>
                </div>
            </div>
        </div>
    )
}
