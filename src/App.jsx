import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Premise from './components/Premise.jsx';
import System from './components/System.jsx';
import Final from './components/Home.jsx';

import Footer from './components/Footer.jsx';


export default function App() {
  return (
    <main className="app-shell">
      <Nav />
      <Final />
      <Premise />
      <Hero />
      <System />
      <Footer />
    </main>
  );
}
