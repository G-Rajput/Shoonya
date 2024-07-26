import React, { useEffect, useState } from 'react';
import yoga1 from '../assets/yoga1.jpeg';

// Function to format date ranges
const formatDateRange = (timestamp) => {
  const start = new Date(timestamp * 1000); // Convert to milliseconds
  const end = new Date(start);
  end.setDate(start.getDate() + 5); // Assuming a 6-day retreat for the range

  const options = { month: 'long', day: 'numeric' };
  const startDate = start.toLocaleDateString('en-US', options);
  const endDate = end.toLocaleDateString('en-US', options);
  const year = start.getFullYear();

  return `${startDate} - ${endDate}, ${year}`;
};

const BASE_API_URL = 'https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats';
const Shoonya = () => {
  const [apiUrl, setApiUrl] = useState(BASE_API_URL);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dateFilter, setDateFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const cardsPerPage = 3; // Pagination variables

  // Fetch products from API
  const fetchListOfProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(apiUrl);
      const data = await res.json();
      setLoading(false);
      setProducts(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListOfProducts();
  }, [apiUrl]);

  // Pagination handlers
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - cardsPerPage < 0 ? 0 : prevIndex - cardsPerPage));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + cardsPerPage >= filteredProducts.length ? prevIndex : prevIndex + cardsPerPage));
  };

  // Handle filter changes
  const handleDateChange = (event) => {
    setDateFilter(event.target.value);
  };

  const handleTypeChange = (event) => {
    setTypeFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Filtered products based on selected filters
  const filteredProducts = products.filter(product => {
    // Date filtering logic
    const productDate = new Date(product.date * 1000);
    const productYear = productDate.getFullYear();

    let dateMatch = true;
    if (dateFilter) {
      const [startYear, endYear] = dateFilter.split('-').map(Number);
      dateMatch = productYear >= startYear && productYear <= endYear;
    }

    // Type filtering logic
    const typeMatch = typeFilter === "" || product.description.toLowerCase().includes(typeFilter);

    // Search filtering logic
    const searchMatch = product.title.toLowerCase().includes(searchQuery);

    return dateMatch && typeMatch && searchMatch;
  });

  return (
    <main className="main">
      <section className="retreat-section">
        <img src={yoga1} alt="Meditation" className="retreat-image" />
        <div className="retreat-content">
          <h2 className="retreat-title">Discover Your Inner Peace</h2>
          <p className="retreat-description">
            Join us for a series of wellness retreats designed to help you find tranquility and rejuvenation.
          </p>
        </div>
      </section>
      <div className="filters">
        <div className="filter-dropdowns">
          <div className="dropdown">
            <select id="date-filter" className="custom-button" value={dateFilter} onChange={handleDateChange}>
              <option value="">Select Date</option>
              <option value="2023-2024">2023-2024</option>
              <option value="2024-2025">2024-2025</option>
            </select>
          </div>
          <div className="dropdown">
            <select id="type-filter" className="custom-button" value={typeFilter} onChange={handleTypeChange}>
              <option value="">Select Type</option>
              <option value="yoga">Yoga</option>
              <option value="meditation">Meditation</option>
              <option value="detox">Detox</option>
            </select>
          </div>
        </div>
        <div className='search-input-wrapper'>
          <input
            type="search"
            placeholder="Search retreats by title"
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="retreats-grid">
        {loading ? (
          <p>Please wait! Data is loading...</p>
        ) : products.length === 0 ? (
          <p>No data available. Please try again later.</p>
        ) : filteredProducts.length === 0 ? (
          <p>No results found. Please adjust your filters and search criteria.</p>
        ) : (
          filteredProducts.slice(currentIndex, currentIndex + cardsPerPage).map((productItem) => (
            <div className="retreat-card" key={productItem.id}>
              <img src={productItem.image} alt={productItem.title} className="retreat-card-image" />
              <div className="retreat-card-content">
                <h3 className="retreat-card-title">{productItem.title}</h3>
                <p className="retreat-card-description">{productItem.description}</p>
                <p className="retreat-card-description">Date: {formatDateRange(productItem.date)}</p>
                <p className="retreat-card-description">Location: {productItem.location}</p>
                <p className="retreat-card-description">Price: ${productItem.price}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="pagination-btn-wrapper">
        <button className="custom-button" onClick={handlePrevious} disabled={currentIndex === 0}>
          Previous
        </button>
        <button className="custom-button" onClick={handleNext} disabled={currentIndex + cardsPerPage >= filteredProducts.length}>
          Next
        </button>
      </div>
    </main>
  );
};

export default Shoonya;
