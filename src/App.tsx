import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { CustomBook } from './pages/CustomBook';
import { Subscriptions } from './pages/Subscriptions';
import { HowItWorks } from './pages/HowItWorks';
import { About } from './pages/About';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';
import { TermsAndConditions } from './pages/TermsAndConditions';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Sitemap } from './pages/Sitemap';
import { FAQ } from './pages/FAQ';
import { Cart } from './pages/Cart';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function App() {
  return (
    <Layout>
      <Routes>
        {/* Pages principales */}
        <Route path="/" element={<Home />} />
        <Route path="/nos-livres-sur-mesure" element={<CustomBook />} />
        <Route path="/nos-abonnements" element={<Subscriptions />} />
        <Route path="/comment-ca-marche" element={<HowItWorks />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />

        {/* Pages légales */}
        <Route path="/conditions-generales" element={<TermsAndConditions />} />
        <Route path="/politique-confidentialite" element={<PrivacyPolicy />} />
        <Route path="/plan-du-site" element={<Sitemap />} />
        <Route path="/faq" element={<FAQ />} />

        {/* Pages utilisateur */}
        <Route path="/panier" element={<Cart />} />
        <Route path="/connexion" element={<Login />} />
        <Route path="/inscription" element={<Register />} />
      </Routes>
    </Layout>
  );
}

export default App;