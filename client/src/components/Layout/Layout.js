import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast"

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8"></meta>
        <meta name="description" content={description}></meta>
        <meta name="keywords" content={keywords}></meta>
        <meta name="author" content={author}></meta>
        <title>{title}</title>
      </Helmet>
      <Header></Header>
      <main style={{ minHeight: "70vh" }}>
        <Toaster></Toaster>
        {children}
      </main>
      <Footer></Footer>
    </div>
  );
};

Layout.defaultProps = {
  title: "ECommerce App - Shop now",
  description: "MERN Stack Project",
  keywords: "MERN, react, node, mongodb",
  author: "Umair Ahmed Soomro",
};

export default Layout;
