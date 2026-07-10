import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Security from "./pages/Security";
import UseCases from "./pages/UseCases";
import Deployment from "./pages/Deployment";
import Press from "./pages/Press";
import About from "./pages/About";
import Contact from "./pages/Contact";
import WhyNot from "./pages/Whynot";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/security" element={<Security />} />
        <Route path="/use-cases" element={<UseCases />} />
        <Route path="/deployment" element={<Deployment />} />
        <Route path="/press" element={<Press />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/whynot" element={<WhyNot />} />
        {/* Fallback: unknown routes redirect to the home page content */}
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
