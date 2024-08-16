import { Input } from "@material-tailwind/react";
import React from "react";

export default function SearchComponent({ searchInput, setSearchInput }) {
  return (
    <Input
      label="Search Image"
      icon={<i className="fas fa-search" />}
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
    />
  );
}
