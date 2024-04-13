import useSWR from 'swr';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Error from 'next/error';

const fetcher = (url) => fetch(url).then((res) => res.ok ? res.json() : Promise.reject(res));
const ArtworkCard = ({ objectID }) => {
  const { data, error } = useSWR(
    objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null, fetcher
  );
  if (error) return <Error statusCode={404}/>;
  if (!data) return <div>Loading...</div>;
  return (
    <Card style={{ width: '18rem', margin: '1rem'}}>
      <Card.Img variant="top" src={data.primaryImageSmall || 'https://via.placeholder.com/375x375.png?text=Image+Not+Available'} style={{ height: '18rem', objectFit: 'cover' }} />
      <Card.Body>
        <Card.Title>{data.title || 'N/A'}</Card.Title>
        <Card.Text>
          Date: {data.objectDate || 'N/A'}<br />
          Classification: {data.classification || 'N/A'}<br />
          Medium: {data.medium || 'N/A'}
        </Card.Text>
        <Link href={`/artwork/${objectID}`} passHref>
          <Button variant="dark">ID: {objectID}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};
export default ArtworkCard;
