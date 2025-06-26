import { Gallery } from "./Gallery"
import { SearchPanel } from "./SearchPanel"

export function MoreProductsPanel({items,setToInsert}){
    return (
        <>
        <SearchPanel items={items} filterKey={"name"} DisplayComponent={Gallery} displayComponentProps={{onClick:setToInsert,keyField:"id"}}></SearchPanel>
        </>
    )
}
