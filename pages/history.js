// pages/history.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { Card, ListGroup, Button } from 'react-bootstrap';
import styles from '@/styles/History.module.css';
import { removeFromHistory } from '../lib/userData';

const History = () => {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!searchHistory) return null; 

  let parsedHistory = [];
  searchHistory.forEach(h => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  const historyClicked = (e, index) => {
    e.stopPropagation();
    const query = searchHistory[index];
    router.push(`/artwork?${query}`);
  };

  const removeHistoryClicked = async (e, index) => {
    e.stopPropagation();
    const updateHistory = await removeFromHistory(searchHistory[index]);
    setSearchHistory(updateHistory);
  };

  return (
    <Card className="mt-5">
      <Card.Header as="h5">Search History</Card.Header>
      <Card.Body>
        {parsedHistory.length === 0 ? (
          <Card.Text className="text-center">Nothing Here Try searching for some artwork.</Card.Text>
        ) : (
          <ListGroup variant="flush">
            {parsedHistory.map((historyItem, index) => (
              <ListGroup.Item
                key={index}
                className={styles.historyListItem}
                onClick={(e) => historyClicked(e, index)}
              >
                {Object.keys(historyItem).map(key => (
                  <span key={key}>
                    {key}: <strong>{historyItem[key]}</strong>&nbsp;
                  </span>
                ))}
                <Button
                  className="float-end"
                  variant="danger"
                  size="sm"
                  onClick={(e) => removeHistoryClicked(e, index)}
                >
                  &times;
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
};

export default History;
