import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import RegisterAccount from "./components/RegsiterAccount";
import UploadBook from "./components/UploadBook";
import HomePage from "./Pages/HomePage";
// import ReadBooks from "./Pages/ReadBooks";
import ReadBooksFromNesJS from "./Pages/FetchApiPages/ReadBook";
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
        <Route path="/readBooks" element={<ReadBooksFromNesJS />} />
        <Route path="/myaccount" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
