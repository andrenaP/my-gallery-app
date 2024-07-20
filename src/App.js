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
  const [currentPage, setCurrentPage] = useState(1); // New state for current page number
  const imagesPerPage = 10;
  const fast = 100;
  const slow = 13000;

  useEffect(() => {
    
    // Fetch data from output.json
        setGalleries(Data);
        if (selectedGallery) {
          setDisplayedImages(galleries[selectedGallery].slice((currentPage - 1) * imagesPerPage, currentPage * imagesPerPage));
        }
  }, [selectedGallery, galleries, currentPage]);

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


  // Element to move + duration in milliseconds
function scrollTo(element, duration) {
  var e = document.documentElement;
  if (e.scrollTop === 0) {
    var t = e.scrollTop;
    ++e.scrollTop;
    e = t + 1 === e.scrollTop-- ? e : document.body;
  }
  scrollToC(e, e.scrollTop, element, duration);
}
// Element to move, element or px from, element or px to, time in ms to animate
function scrollToC(element, from, to, duration) {
  if (duration <= 0) return;
  if (typeof from === "object") from = from.offsetTop;
  if (typeof to === "object") to = to.offsetTop;

  scrollToX(element, from, to, 0, 1 / duration, 20, easeOutCuaic);
}
function scrollToX(element, xFrom, xTo, t01, speed, step, motion) {
  if (t01 < 0 || t01 > 1 || speed <= 0) {
    element.scrollTop = xTo;
    return;
  }
  element.scrollTop = xFrom - (xFrom - xTo) * motion(t01);
  t01 += speed * step;

  setTimeout(function() {
    scrollToX(element, xFrom, xTo, t01, speed, step, motion);
  }, step);
}
function easeOutCuaic(t) {
  t--;
  return t * t * t + 1;
}



  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    scrollTo(0, fast);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      scrollTo(0, fast);
    }
  };

  const handleJumpToPage = (event) => {
    setCurrentPage(parseInt(event.target.value));
    scrollTo(0, fast);
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
            {/* {!isLoadingMore && displayedImages.length < galleries[selectedGallery].length && (
              <button onClick={handleLoadMore}>Load More</button>
            )}  */}


            {isLoadingMore && <p>Loading more images...</p>}
          </div>

          {selectedGallery && (
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
          <select value={currentPage} onChange={handleJumpToPage}>
            {/* Calculate number of pages based on total images */}
            {[...Array(Math.ceil(galleries[selectedGallery].length / imagesPerPage)).keys()].map((page) => (
              <option key={page + 1} value={page + 1}>{page + 1}</option>
            ))}
          </select>
          <button onClick={handleNextPage} disabled={currentPage === Math.ceil(galleries[selectedGallery].length / imagesPerPage)}>Next</button>
        </div>
      )}

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