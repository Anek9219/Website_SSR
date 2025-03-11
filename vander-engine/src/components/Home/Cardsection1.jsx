import React, { useState, useEffect } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick-theme.css";


export default function Cardsection1({ showproduct, handleAddToCart }) {
  const [engines, setEngines] = useState([]);
  const [transmissions, setTransmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadedProducts, setLoadedProducts] = useState(5);

  const formatData = (data) => {
    const formattedProducts = [];
    Object.keys(data).forEach((year) => {
      const makes = data[year];
      Object.keys(makes).forEach((make) => {
        const models = makes[make];
        Object.keys(models).forEach((model) => {
          const variants = models[model];
          Object.keys(variants).forEach((variant) => {
            const product = variants[variant];
            const id = product.Stock
              ? `${product.Stock}-${make}-${model}-${variant}`
              : `${make}-${model}-${variant}`;
            formattedProducts.push({
              id,
              name: product.name || "Unknown Product",
              variant: variant || "Unknown Variant",
              price: product.pricing,
              year,
              model,
              image: product.image || "default_image.jpg",
              description: product.description || "No description available",
              stock: product.Stock || "Unknown Stock",
              warranty: product.warranty || "No warranty information",
              miles: product.miles || "Unknown miles",
            });
          });
        });
      });
    });
    return formattedProducts;
  };

  const fetchData = async (url, setData) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && typeof data === "object") {
        setData(formatData(data));
      } else {
        console.error("Invalid data format", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData("https://backend.vanderengines.com/api/engines", setEngines);
    fetchData("https://backend.vanderengines.com/api/transmission", setTransmissions);
  }, []);

  const products = [...engines, ...transmissions];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  if (loading || products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cardsection1 my-5" style={{ overflow: "hidden" }}>
      <div className="container-fluid">
        <Slider {...settings}>
          {products.slice(0, loadedProducts).map((product) => (
            <div key={product.id}>
              <div className="card cardPro mx-2 " style={{ height: "27em" }}>
                <img
                  src={product.image}
                  className="d-block img-fluid"
                  alt={product.name}
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <p id="HeadPro" className="fw-bold">
                    {product.year} <span> </span>
                    {product.name} {/* Display cleaned model name */}
                  </p>
                  <p id="variant">Variant: {product.variant}</p>
                  <p id="pricePro">{product.price}</p>
                  <p id="stock">Stock: {product.stock}</p>
                  <div className="starArea">
                    {[...Array(5)].map((_, index) => (
                      <i key={index} className="fa-solid fa-star"></i>
                    ))}
                  </div>
                  <div className="btnPrice">
                    <button
                      className="theme-btn btn card-btn"
                      type="submit"
                      onClick={() => {
                        handleAddToCart({
                          id: product.Stock,
                          name: `${product.year} ${product.name}`,
                          price: product.price,
                          stockNumber: product.stock,
                          model: product.model,
                          year: product.year,
                          variant: product.variant,
                          imageURL: product.image,
                          quantity: 1,
                        });
                        navigate("/addtocart");
                      }}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
