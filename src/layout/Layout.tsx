import { Outlet } from "react-router";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
