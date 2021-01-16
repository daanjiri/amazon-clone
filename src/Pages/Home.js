import React, { useEffect, useState } from "react";
import "./Home.css";
import Product from "../components/Product/Product";
import { db } from "../firebase";
import { useStateValue } from "../StateProvider";

function Home() {
  const [products, setProducts] = useState([]);
  const [{ searchfield }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = db.collection("products").onSnapshot((snapshot) => {
      setProducts(snapshot.docs.map((doc) => doc.data()));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  console.log(products);

  const filterProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(searchfield.toLowerCase());
  });

  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />
        <div className="home__row">
          {filterProducts.map((product, index) => (
            <Product
              id={product.id}
              title={product.title}
              price={product.price}
              rating={product.rating}
              image={product.image}
              key={new Date() + index + product.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
