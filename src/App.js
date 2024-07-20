import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Or use fetch

import Data from "./output.json"
var PathToImages= "Img"
function App() {
  const [galleries, setGalleries] = useState([]); 
  const [selectedGallery, setSelectedGallery] = useState(null); 
  const [showGalleryList, setShowGalleryList] = useState(true); // New state for showing/hiding gallery list
  useEffect(() => {
    
    // Fetch data from output.json
    //axios.get(Data) // Replace with your file path
     // .then(response => {
        setGalleries(Data);
      //})
     // .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      {/* Render the gallery list */}
      <button onClick={() => setShowGalleryList(!showGalleryList)}>
        {showGalleryList ? 'Hide Galleries' : 'Show Galleries'}
      </button> 

      {showGalleryList && ( // Conditional rendering of the gallery list
        <div className="gallery-list">
          <h1>My Galleries</h1>
          <ul>
            {Object.keys(galleries).map((galleryName) => (
              <li key={galleryName}>
                <button onClick={() => setSelectedGallery(galleryName)}> {galleryName}</button> 
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedGallery && (
        <div>
          <h2>{selectedGallery} Images</h2>
          {galleries[selectedGallery].map((imageUrl, index) => (
            <img key={index} src={PathToImages+"/"+selectedGallery+"/"+imageUrl} alt={`Image ${index + 1}`} />
          ))}
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