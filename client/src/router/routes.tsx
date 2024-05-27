import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home } from "../modules/home/pages/Home";
import { ContactPage } from "../modules/contacts/pages/contact";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact/:id" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
