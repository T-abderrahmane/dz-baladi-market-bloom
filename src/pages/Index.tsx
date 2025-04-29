
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCategories from "@/components/ProductCategories";
import SpecialOffers from "@/components/SpecialOffers";
import AboutUs from "@/components/AboutUs";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <ProductCategories />
        <SpecialOffers />
        <AboutUs />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
