import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import RegisterAccount from "./components/RegsiterAccount";
import HomePage from "./Pages/HomePage";
import Footer from "./components/Footer";
import UploadBook from "./components/UploadBook";
import ReadBooks from "./Pages/ReadBooks";
import ProfilePage from "./Pages/ProfilePage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterAccount />} />
        <Route path="/uploadBook" element={<UploadBook />} />
        <Route path="/readBooks" element={<ReadBooks />} />
        <Route path="/myaccount" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
