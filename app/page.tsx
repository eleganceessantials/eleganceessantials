
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Categories from "./sections/categories";
import CustomerCare from "./sections/customercare";
import Hero from "./sections/hero";
import LatestProducts from "./sections/LatestProducts";
import Watch from "./sections/watch";
export default function Home() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <Categories/>
      <LatestProducts/>
      {/* <Watch/> */}
      <CustomerCare/>
      <Footer/>
    </>
  );
}


