import React, { useState } from 'react';

const SearchComponent = ({ products, setFilteredProducts }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(value) ||
      product.description.toLowerCase().includes(value)
    );

    setFilteredProducts(filtered);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Buscar descuentos..."
        className="search-input"
      />
    </div>
  );
};

export default SearchComponent;
