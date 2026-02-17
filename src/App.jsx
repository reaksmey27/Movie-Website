import React from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./features/home/HomePage";

const App = () => {

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-purple-500/30">
      <Navbar />
      <main className="relative">
        <HomePage />
      </main>
      <Footer />
    </div>
  );
};

export default App;