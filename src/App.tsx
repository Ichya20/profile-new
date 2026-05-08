/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { AnimatedBackground } from "./components/ui/AnimatedBackground";
import { Home } from "./pages/Home";
import BlogPage from "./pages/BlogPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="bg-transparent text-white w-full min-h-screen font-sans selection:bg-[var(--color-accent)] selection:text-white relative z-0">
        <AnimatedBackground />
        <div className="noise-overlay"></div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogPage />} /> {/* <-- 2. Tambahkan route ini */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
