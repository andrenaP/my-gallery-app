import React from 'react';
import { Container, Card } from 'react-bootstrap';
var PathToImages = process.env.PUBLIC_URL + '/' + process.env.REACT_APP_Folder;

const RenderGallery = ({
  displayedImages,
  galleries,
  selectedGallery,
  currentPage,
  setCurrentPage,
}) => {
  return (
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
  );
};

export default RenderGallery;
