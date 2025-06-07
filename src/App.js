import React, { useState, useEffect } from 'react';
import './App.css';
import MyPagination from 'components/MyPagination';
import axios from 'axios';
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
import { useParams, useNavigate } from 'react-router-dom';

const JsonFolder = process.env.REACT_APP_JsonFolder; // e.g., "Img/output.json"
const PathToImages =
  process.env.PUBLIC_URL + '/' + process.env.REACT_APP_Folder; // e.g., "/Img/"

function App() {
  const [galleries, setGalleries] = useState({});
  const [displayedImages, setDisplayedImages] = useState([]);
  const [filteredGalleries, setFilteredGalleries] = useState([]);
  const [filteredString, setFilteredString] = useState('');
  const [settingsPaginationFixed, setSettingsPaginationFixed] = useState(true);
  const imagesPerPage = 20;

  const { selectedGallery, page } = useParams();
  const navigate = useNavigate();
  const currentPage = page ? parseInt(page, 10) : 1;

  useEffect(() => {
    let mounted = true;
    axios
      .get(`/${JsonFolder}`)
      .then(response => {
        if (mounted) {
          setGalleries(response.data || {});
        }
      })
      .catch(error => console.error('Error fetching data:', error));

    return () => (mounted = false);
  }, []);

  useEffect(() => {
    if (selectedGallery && galleries && Object.keys(galleries).length > 0) {
      const decodedGallery = decodeURIComponent(selectedGallery);
      if (galleries[decodedGallery]) {
        const totalPages = Math.ceil(
          galleries[decodedGallery].length / imagesPerPage
        );
        const validPage =
          isNaN(currentPage) || currentPage < 1
            ? 1
            : Math.min(currentPage, totalPages);
        if (validPage !== currentPage) {
          navigate(`/${encodeURIComponent(decodedGallery)}/${validPage}`);
        } else {
          setDisplayedImages(
            galleries[decodedGallery].slice(
              (validPage - 1) * imagesPerPage,
              validPage * imagesPerPage
            )
          );
        }
      } else {
        setDisplayedImages([]);
      }
    } else {
      setDisplayedImages([]);
    }

    const filteredGalleriesSearchFunc = filteredString
      ? Object.keys(galleries).filter(gallery =>
          gallery.toLowerCase().includes(filteredString.toLowerCase())
        )
      : Object.keys(galleries);
    setFilteredGalleries(filteredGalleriesSearchFunc);
  }, [selectedGallery, currentPage, filteredString, galleries, navigate]);

  const SearchFunction = event => {
    setFilteredString(event.target.value);
  };

  const handlePageChange = newPage => {
    if (selectedGallery) {
      navigate(
        `/${encodeURIComponent(decodeURIComponent(selectedGallery))}/${newPage}`
      );
    }
  };

  return (
    <div>
      <Navbar expand={false} className="bg-body-tertiary mb-3">
        <Container fluid>
          <Navbar.Brand>My Galleries App</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-false" />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-false"
            aria-labelledby="offcanvasNavbarLabel-expand-false"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-false">
                My Galleries
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Form className="d-flex p-2">
                  <FormControl
                    type="text"
                    placeholder="Search.."
                    className="mr-sm-2"
                    onChange={SearchFunction}
                  />
                </Form>
                <Stack gap={3}>
                  <Button
                    active={!settingsPaginationFixed}
                    onClick={() =>
                      setSettingsPaginationFixed(!settingsPaginationFixed)
                    }
                    className="nav-link"
                  >
                    Toggle Pagination Fixed
                  </Button>
                  {filteredGalleries.map(galleryName => (
                    <Button
                      key={galleryName}
                      id={`nav-dropdown-${galleryName}`}
                      className="nav-link"
                      onClick={() => {
                        navigate(`/${encodeURIComponent(galleryName)}/1`);
                      }}
                      active={
                        galleryName ===
                        decodeURIComponent(selectedGallery || '')
                      }
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

      {selectedGallery && galleries[decodeURIComponent(selectedGallery)] && (
        <Container className="mt-3">
          <h2>{decodeURIComponent(selectedGallery)} Images</h2>
          <Container className="row">
            {displayedImages.map((imageUrl, index) => (
              <Card
                key={index + (currentPage - 1) * imagesPerPage}
                className="image-container"
              >
                <Card.Img
                  variant="top"
                  src={
                    decodeURIComponent(selectedGallery).includes('/')
                      ? `${process.env.PUBLIC_URL}/${imageUrl}` // Use full path for galleries with "/"
                      : `${PathToImages}/${decodeURIComponent(selectedGallery)}/${imageUrl}`
                  }
                  alt={`${imageUrl}-${index}`}
                  onClick={() => {
                    const totalPages = Math.ceil(
                      galleries[decodeURIComponent(selectedGallery)].length /
                        imagesPerPage
                    );
                    if (currentPage < totalPages) {
                      handlePageChange(currentPage + 1);
                    }
                  }}
                />
              </Card>
            ))}
          </Container>
          <MyPagination
            paginate={handlePageChange}
            totalItems={
              galleries[decodeURIComponent(selectedGallery)]?.length || 0
            }
            itemsPerPage={imagesPerPage}
            currentPage={currentPage}
            className={
              settingsPaginationFixed ? 'pagination-fixed' : 'pagination-normal'
            }
          />
        </Container>
      )}
    </div>
  );
}

export default App;
