import useSWR from 'swr';
import { Card, Button } from 'react-bootstrap';
import Error from 'next/error';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import { addToFavourites, removeFromFavourites } from '@/lib/userData';

const fetcher = (url) => fetch(url).then((res) => res.json());

const ArtworkCardDetail = ({ objectID }) => {
  const { data, error } = useSWR(
    objectID ?`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`: null
  );
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const isFavourite = favourites.includes(objectID);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favourites?.includes(objectID))
  }, [favourites, objectID]);

  async function toggleFavourite(){
    if (showAdded)
    {
      setFavourites(await removeFromFavourites(objectID));
      setShowAdded(false);
    }else
    {
      setFavourites(await addToFavourites(objectID));
      setShowAdded(true);
    }
  };

  if (error) return <Error statusCode={404} />;
  if (!data) return null;
  return (
    <Card>
      {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} />}
      <Card.Body>
        <Card.Title>{data.title || 'N/A'}</Card.Title>
        <Card.Text>
          Date: {data.objectDate || 'N/A'}<br />
          Classification: {data.classification || 'N/A'}<br />
          Medium: {data.medium || 'N/A'}<br /><br />
          Artist: {data.artistDisplayName || 'N/A'}
          {data.artistWikidata_URL && (
            <>
            &nbsp;(<a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">Wiki</a>)
          </>
          )}
          <br />
          Credit Line: {data.creditLine || 'N/A'}<br />
          Dimensions: {data.dimensions || 'N/A'}<br />
        </Card.Text>
        <Button variant={isFavourite ? "secondary" : "primary"} onClick={toggleFavourite}>
          {isFavourite ? '+Favourite (added)' : '+Favourite'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ArtworkCardDetail;
