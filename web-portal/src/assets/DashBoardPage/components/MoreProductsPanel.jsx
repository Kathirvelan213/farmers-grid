import { Gallery } from "./Gallery"
import { SearchPanel } from "./SearchPanel"

export function MoreProductsPanel({items}){
    return (
        <>
        <SearchPanel items={items} filterKey={"name"} DisplayComponent={Gallery}></SearchPanel>
        </>
    )
}
