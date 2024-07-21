import React, { useState, useEffect } from 'react';
import './App.css'; // Add this import
import MyPagination from 'components/MyPagination';
import axios from 'axios'; // Or use fetch

import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Navbar,
  Nav,
  Container,
  Card,
  Form,
  FormControl,
  Button,
  Offcanvas,
  Stack,
} from 'react-bootstrap';

var Data = process.env.REACT_APP_JsonFolder;
const MainUrl = window.location.href;
var PathToImages = process.env.PUBLIC_URL + '/' + process.env.REACT_APP_Folder;

function App() {
  const [galleries, setGalleries] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [displayedImages, setDisplayedImages] = useState([]);
  const [filteredGalleries, setfilteredGalleries] = useState([]);
  const [filteredString, setfilteredString] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // New state for current page number
  const imagesPerPage = 1;
  const fast = 100;

  useEffect(() => {
    let mounted = true;
    axios
      .get(Data) // Replace with your file path
      .then(response => {
        if (mounted) {
          setGalleries(response.data);
        }
      })
      .catch(error => console.error('Error fetching data:', error));

    return () => (mounted = false);
  }, []);

  useEffect(() => {
    if (selectedGallery) {
      setDisplayedImages(
        galleries[selectedGallery].slice(
          (currentPage - 1) * imagesPerPage,
          currentPage * imagesPerPage
        )
      );
    }
    var filteredGalleriesSerchFunk;
    if (filteredString) {
      const searchTerm = filteredString.toLowerCase();
      filteredGalleriesSerchFunk = Object.keys(galleries).filter(gallery =>
        gallery.toLowerCase().includes(searchTerm)
      );
    } else filteredGalleriesSerchFunk = Object.keys(galleries);

    setfilteredGalleries(filteredGalleriesSerchFunk);
  }, [selectedGallery, currentPage, filteredString, galleries]);

  const SearchFunction = event => {
    setfilteredString(event.target.value);
  };

  return (
    <div>
      {/* Render the gallery list */}
      <Navbar key={false} expand={false} className="bg-body-tertiary mb-3">
        <Container fluid>
          <Navbar.Brand>My Galleries App</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${false}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
                My Galleries
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {/* Filter by Gallery */}
                <Form className="d-flex p-2">
                  <FormControl
                    type="text"
                    placeholder="Search.."
                    className="mr-sm-2"
                    onChange={SearchFunction}
                  />
                </Form>
                {/* Display filteredGalleries list */}
                <Stack gap={3}>
                  {filteredGalleries.map(galleryName => (
                    <Button
                      key={galleryName}
                      id={`nav-dropdown-${galleryName}`}
                      className="nav-link"
                      onClick={() => {
                        setSelectedGallery(galleryName);
                        setCurrentPage(1);
                      }}
                      active={galleryName === selectedGallery}
                    >
                      {galleryName}
                    </Button>
                  ))}
                </Stack>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      {selectedGallery && (
        <Container className="mt-3">
          <h2>{selectedGallery} Images</h2>
          <Container className="row">
            {displayedImages.map((imageUrl, index) => (
              <Card key={index} className="image-container">
                <Card.Img
                  variant="top"
                  src={PathToImages + '/' + selectedGallery + '/' + imageUrl}
                  alt={`${imageUrl}-${index}`}
                  onClick={() => {
                    if (currentPage < galleries[selectedGallery].length)
                      setCurrentPage(currentPage + 1);
                  }}
                />
              </Card>
            ))}
          </Container>
          {/* Pagination */}
          {selectedGallery && (
            <MyPagination
              paginate={setCurrentPage}
              totalItems={galleries[selectedGallery].length}
              itemsPerPage={imagesPerPage}
              currentPage={currentPage}
              className="text-center"
            ></MyPagination>
          )}
        </Container>
      )}
    </div>
  );
}

export default App;
