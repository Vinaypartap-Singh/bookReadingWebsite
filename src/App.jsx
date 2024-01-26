import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import RegisterAccount from "./components/RegsiterAccount";
import HomePage from "./Pages/HomePage";
import Footer from "./components/Footer";
import UploadBook from "./components/UploadBook";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterAccount />} />
        <Route path="/uploadBook" element={<UploadBook />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
