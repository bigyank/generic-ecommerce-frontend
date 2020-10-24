import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './Components/Header';
import Footer from './Components/Footer';

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <h1>Hello World</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
