/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { AnimatedBackground } from "./components/ui/AnimatedBackground";
import WelcomeScreen from "./components/WelcomeScreen";

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
  const [showWelcome, setShowWelcome] = useState(() => {
    return sessionStorage.getItem("welcomeSeen") !== "true";
  });

  const handleFinishWelcome = () => {
    sessionStorage.setItem("welcomeSeen", "true");
    setShowWelcome(false);
  };

  return (
    <Router>
      <ScrollToTop />

      {showWelcome && <WelcomeScreen onFinish={handleFinishWelcome} />}

      <div className="bg-transparent text-white w-full min-h-screen font-sans selection:bg-[var(--color-accent)] selection:text-white relative z-0">
        <AnimatedBackground />
        <div className="noise-overlay"></div>

        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
