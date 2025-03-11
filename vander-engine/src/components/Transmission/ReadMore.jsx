import React, { useState } from 'react';
import './transmission.css'
const ReadMore = ({ text, wordLimit = 30 }) => {
  const [showFullText, setShowFullText] = useState(false);

  // Split the full text into words
  const words = text.split(' ');

  // Truncated version: show first `wordLimit` words
  const truncatedText = words.slice(0, wordLimit).join(' ') + (words.length > wordLimit ? '...' : '');

  // Toggle full text visibility
  const handleToggleText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <div>
      <div className="content-text">
        {showFullText ? text : truncatedText}
      </div>
      <button 
        className="btn btn-link read-btn" 
        onClick={handleToggleText}
        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      >
        {showFullText ? (
          <>
            <span>Read Less</span>
            <i className="fa fa-chevron-up" style={{ marginLeft: '5px' }}></i>
          </>
        ) : (
          <>
            <span>Read More</span>
            <i className="fa fa-chevron-down" style={{ marginLeft: '5px' }}></i>
          </>
        )}
      </button>
    </div>
  );
};

export default ReadMore;
