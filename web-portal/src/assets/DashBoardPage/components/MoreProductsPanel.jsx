import { Gallery } from "./Gallery.jsx"
import { SearchPanel } from "../../global/components/SearchPanel.jsx"

export function MoreProductsPanel({items,setToInsert}){
    return (
        <>
        <SearchPanel items={items} filterKey={"name"} DisplayComponent={Gallery} displayComponentProps={{onClick:setToInsert,keyField:"id"}}></SearchPanel>
        </>
    )
}
