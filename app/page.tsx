
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Categories from "./sections/categories";
import CustomerCare from "./sections/customercare";
import Hero from "./sections/hero";
import LatestProducts from "./sections/LatestProducts";
import ContactSection from "./components/ContactSection";
import ShippingTicker from "./components/Ticker";
export default function Home() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <Categories/>
      <LatestProducts/>
      <ShippingTicker/>
      <ContactSection/>
      <CustomerCare/>
      <Footer/>
    </>
  );
}


