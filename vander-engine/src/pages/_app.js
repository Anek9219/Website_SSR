import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css"
import Header from "@/components/Header";
import GeneralHeader from "@/components/GeneralHeader";
import Footer from "@/components/Footer";


export default function App({ Component, pageProps }) {
  return (
    <>
     
      <GeneralHeader />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}