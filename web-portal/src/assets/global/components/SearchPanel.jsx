import "../styles/global.css";
import { useState } from "react";

export function SearchPanel({
  items,
  filterKey,
  DisplayComponent,
  displayComponentProps,
  searchBarOverrideStyle,
  searchPanelOverrideStyle,
  placeholderText,
  extraProps = [],
}) {
  const [selected, setSelected] = useState("");

  function handleSearchChange(e) {
    setSelected(e.target.value);
  }

  const query = selected.toLowerCase();
  const filteredItems = items.filter((items) => {
    return query === "" || items[filterKey].toLowerCase().includes(query);
  });

  return (
    <div className={`searchPanel ${searchPanelOverrideStyle ?? ""}`}>
      <div className="flex">
        <input
          placeholder={placeholderText ?? "Search..."}
          value={selected}
          onChange={handleSearchChange}
          className={`searchBar ${searchBarOverrideStyle ?? ""}`}
        />

        <div className="items-center text-right justify-end flex flex-1 gap-4 mr-5">
        {extraProps.map(({Item,props},key)=>(<Item key={key} {...props}/>))}
        </div>
      </div>
      <DisplayComponent items={filteredItems} {...displayComponentProps}></DisplayComponent>
    </div>
  );
}
