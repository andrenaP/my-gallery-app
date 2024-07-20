import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Or use fetch
import './App.css'; // Add this import

import Data from "./output.json"


import { slide as Menu } from 'react-burger-menu'

class Example extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }
}
var PathToImages= "Img"
function App() {
  const [galleries, setGalleries] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState(null);
  // const [showGalleryList, setShowGalleryList] = useState(true);
  const [displayedImages, setDisplayedImages] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const imagesPerPage = 10;

  useEffect(() => {
    
    // Fetch data from output.json
        setGalleries(Data);
        if (selectedGallery) {
          setDisplayedImages(galleries[selectedGallery].slice(0, imagesPerPage));
        }
  }, [selectedGallery, galleries]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    // Calculate the start index for the next batch of images
    const startIndex = displayedImages.length; 
    const endIndex = startIndex + imagesPerPage;
    setDisplayedImages((prevImages) => {
      return [...prevImages, ...galleries[selectedGallery].slice(startIndex, endIndex)];
    });
    setIsLoadingMore(false); // Turn off loading indicator
  };

  return (
    <div>
      {/* Render the gallery list */}
      <Menu>
        <div className="gallery-list">
          <h1 >My Galleries</h1>
          <ul>
            {Object.keys(galleries).map((galleryName) => (
              <li key={galleryName} className="menu-item">
                <button onClick={() => setSelectedGallery(galleryName)}> {galleryName}</button> 
              </li>
            ))}
          </ul>
        </div>
      </Menu>


{selectedGallery && ( // Show the selected gallery's images
        <div>
          <h2>{selectedGallery} Images</h2> 
          <div className="image-container">
            {/* Display the images */}
            {displayedImages.map((imageUrl, index) => (
              <img key={index} src={PathToImages+"/"+selectedGallery+"/"+imageUrl} alt={`Image ${index + 1}`} />
            ))}

            {/* Load More Button */}
            {!isLoadingMore && displayedImages.length < galleries[selectedGallery].length && (
              <button onClick={handleLoadMore}>Load More</button>
            )} 

            {isLoadingMore && <p>Loading more images...</p>}
          </div>
        </div>
      )}

    </div>
  );
}

// Add this function to handle gallery clicks
const handleGalleryClick = (selectedGallery) => {
  // Update state or props to display the selected gallery's images
};

export default App;