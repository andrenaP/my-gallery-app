import React, { useState, useEffect } from 'react';
import './App.css'; // Add this import

//import Data from "./Test_output.json"
import { slide as Menu } from 'react-burger-menu'
import axios from 'axios'; // Or use fetch
var Data






if(process.env.REACT_APP_JsonFolder)
  Data = process.env.REACT_APP_JsonFolder
else
 Data = 'Test_output.json'


 ;

const MainUrl=window.location.href;

var PathToImages
if (process.env.REACT_APP_Folder)
   PathToImages=MainUrl+"/"+ process.env.REACT_APP_Folder;
else
 PathToImages=MainUrl+"/IMG";

function App() {
  const [galleries, setGalleries] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState(null);
  // const [showGalleryList, setShowGalleryList] = useState(true);
  const [displayedImages, setDisplayedImages] = useState([]);
  const [filteredGalleries, setfilteredGalleries] = useState([]);
  const [filteredString, setfilteredString] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // New state for current page number
  const imagesPerPage = 10;
  const fast = 100;

  useEffect(() => {

    axios.get(Data) // Replace with your file path
    .then(response => {
      setGalleries(response.data);
    })
    .catch(error => console.error('Error fetching data:', error));
    
    // Fetch data from output.json
      //  var CleardDAta =  Data.default;
        // setGalleries(CleardDAta);
        if (selectedGallery) {
          setDisplayedImages(galleries[selectedGallery].slice((currentPage - 1) * imagesPerPage, currentPage * imagesPerPage));
        }
        // console.log(CleardDAta);
        const searchTerm = filteredString.toLowerCase();
        const filteredGalleriesSerchFunk = Object.keys(galleries).filter((gallery) => 
          gallery.toLowerCase().includes(searchTerm)
        );

        setfilteredGalleries(filteredGalleriesSerchFunk);
  }, [selectedGallery, galleries, currentPage, filteredString]);


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

  const SearchFunction = (event) => {
    setfilteredString(event.target.value);
  };
  

  return (
    <div>
      {/* Render the gallery list */}
      <Menu>
        <div className="gallery-list">
          <h1 >My Galleries</h1>
          <input type="text" id="mySearch" placeholder="Search.." title="Type in a category" onChange={SearchFunction}/>
          <ul>
            {filteredGalleries.map((galleryName) => (
              <li key={galleryName} className="menu-item">
                <button onClick={() => {setSelectedGallery(galleryName) ; setCurrentPage(1)}}> {galleryName}</button> 
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
              <img key={index} src={PathToImages+"/"+selectedGallery+"/"+imageUrl} alt={`${imageUrl}-${index}`} loading="lazy" />
            ))}

     


           
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


export default App;