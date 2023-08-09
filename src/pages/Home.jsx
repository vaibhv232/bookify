import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase'
import BookCard from '../components/Card';
import "../App.css"
import { CardGroup } from 'react-bootstrap';
const HomePage = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    firebase.listAllBooks().then(books => setBooks(books.docs))
  }, [])
  return (
    <div className='container mt-5'>
      <CardGroup>

        {books.map((book) => <BookCard key={book.id} id={book.id} {...book.data()} link={`/book/view/${book.id}`} />
        )}

      </CardGroup>
    </div>
  )
}

export default HomePage