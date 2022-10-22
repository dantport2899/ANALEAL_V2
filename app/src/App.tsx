import React from 'react';
import { AppRouter } from "./router/AppRouter";
import { Footer } from "./componentes/footer";

import './lib/animate/animate.min.css';
import './lib/owlcarousel/assets/owl.carousel.min.css';
import './lib/lightbox/css/lightbox.min.css';

import 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
import './styles/hoverimages.css';

import 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js';
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js';

const App = () => {
  return (
    <div >
      <AppRouter/>
      <Footer/>
    </div>
  );
}

export default App;
