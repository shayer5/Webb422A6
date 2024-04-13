import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import ArtworkCard from '../components/ArtworkCard';
import { Container, Row, Col } from 'react-bootstrap';

const Favourites = () => {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  useEffect(() => {
    const storedFavourites = localStorage.getItem('favourites');
    if(!storedFavourites) return null;
    if (storedFavourites) {
      setFavouritesList(JSON.parse(storedFavourites));
    }
  }, []);

  return (
    <Container>
      
      <Row>
        {favouritesList.length > 0 ? (
          favouritesList.map(objectID => (
            <Col key={objectID} sm={12} md={6} lg={3} className="mb-4">
              <ArtworkCard objectID={objectID} />
            </Col>
          ))
        ) : (
            <><h1>Nothing Here</h1>
            <p>Try adding some new artwork to the list.</p>
            </>
        )}
      </Row>
    </Container>
  );
};
export default Favourites;


