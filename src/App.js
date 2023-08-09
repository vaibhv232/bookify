
import { Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/Register';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import LoginPage from './pages/Login';

import MyNavbar from './components/Navbar';
import List from './pages/List';
import HomePage from './pages/Home';
import BookDetailPage from './pages/Detail';
import OrderPage from './pages/viewOrder';
import ViewOrderDetails from './pages/viewOrderDetail';

function App() {
  return (
    <div>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/book/list" element={<List />} />
        <Route path="/book/view/:bookId" element={<BookDetailPage />} />
        <Route path="/book/orders" element={<OrderPage />} />
        <Route path="books/orders/:bookId" element={<ViewOrderDetails />} />

      </Routes>
    </div>
  );
}

export default App;
