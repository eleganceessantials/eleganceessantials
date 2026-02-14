
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Categories from "./sections/categories";
import CustomerCare from "./sections/customercare";
import Hero from "./sections/hero";
import LatestProducts from "./sections/LatestProducts";
export default function Home() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <Categories/>
      <LatestProducts/>
      <CustomerCare/>
      <Footer/>
    </>
  );
}


