import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Inc/Header';
import HeroSection from './components/HeroSection';
import Footer from './components/Inc/Footer';
import Portfolio from './components/Portfolio';
import ExperienceSection from './components/Experience';
import ContactSection from './components/Contact';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <HeroSection />
      <Portfolio />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </BrowserRouter>
  );
}

export default App;