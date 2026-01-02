import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // 1. Import
import 'react-toastify/dist/ReactToastify.css'; // 2. Import CSS
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer /> {/* 3. Add this component */}
    </>
  );
};

export default App;