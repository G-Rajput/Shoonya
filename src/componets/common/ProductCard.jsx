import React from 'react'


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

const ProductCard = ({productItem}) => {
  return (
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
  )
}

export default ProductCard