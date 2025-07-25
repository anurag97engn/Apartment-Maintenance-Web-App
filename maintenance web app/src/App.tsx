import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
<<<<<<< HEAD
=======
import Miscellaneous from "./pages/Miscellaneous";
>>>>>>> ff57b2d7942cd4b2e77c6dc1908f914fb036fb17
import Blank from "./pages/Blank";
import NoticeBoard from "./pages/NoticeBoard";
import Maintenance from "./pages/Maintenance";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/owners" element={<Blank />} />
            <Route path="/noticeBoard" element={<NoticeBoard />} />
            <Route path="/maintenance" element={<Maintenance />} />
<<<<<<< HEAD
=======
            <Route path="/miscellaneous" element={<Miscellaneous />} />
>>>>>>> ff57b2d7942cd4b2e77c6dc1908f914fb036fb17
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
