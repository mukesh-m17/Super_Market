import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import Categories from "../components/Categories";
import Deals from "../components/Deals";
import Stats from "../components/Stats";
import Subscribe from "../components/Subscribe";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedProducts />
      <Categories />
      <Deals />
      <Subscribe />
    </>
  );
}