import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFirebase } from '../context/Firebase';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
const BookDetailPage = () => {
  const params = useParams();
  const firebase = useFirebase();

  const [qty, setQty] = useState(1);
  const [data, setData] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    firebase.getBookById(params.bookId).then(value => setData(value.data()))
  }, [])

  useEffect(() => {
    if (data) {
      const imageURL = data.imageURL;
      firebase.getImageURL(imageURL).then(url => setUrl(url))
    }
  })
  const placeOrder = async () => {
    const result = await firebase.placeOrder(params.bookId, qty);
    console.log('order placed', result)
  }

  if (data == null)
    return <h1>Loading...</h1>
  return (
    <div className='container' style={{ display: 'flex', textAlign: 'left' }}>
      <div>

        <h1 >{data.name}</h1>
        <img src={url} height="500vh" style={{ borderRadius: '10px' }} />
      </div>
      <div style={{ padding: '50px' }}>
        <h2>Details</h2>
        <h4>Price: Rs. {data.price}</h4>
        <p>ISBN Number: {data.isbn}</p>
        <h2>Owner Details</h2>
        <p>Name: {data.displayName}</p>
        <p>Email: {data.userEmail}</p>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            onChange={(e) => {
              const inputValue = parseInt(e.target.value); // Parse input as an integer
              if (!isNaN(inputValue) && inputValue >= 1 && inputValue <= 5) { //!max order can be 5
                setQty(inputValue);
              }
            }}
            value={qty}
            type="number"
            placeholder="Enter Quantity"
          />
        </Form.Group>
        <Button variant="success"
          onClick={placeOrder}
        >Buy Now</Button>
      </div>
    </div >
  )
}

export default BookDetailPage