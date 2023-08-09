import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

const BookCard = (props) => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [url, setUrl] = useState(null);

  useEffect(() => {
    firebase.getImageURL(props.imageURL).then(url => setUrl(url))
  }, [])
  return (
    <div>
      <Card style={{ width: '18rem', margin: '15px' }}>
        <Card.Img variant="top" src={url} />
        <Card.Body>
          <Card.Title>{props.name}  </Card.Title>
          <Card.Text>
            This Book has a title {props.name} and this book is sold by {props.displayName ? props.displayName : "John Doe"} and this book costs ₹{props.price}
          </Card.Text>
          <Button variant="primary"
            onClick={e => navigate(props.link)}
          >View</Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default BookCard