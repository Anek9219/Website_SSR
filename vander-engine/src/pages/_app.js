import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css"
import Header from "@/components/Header";
import GeneralHeader from "@/components/GeneralHeader";
import Footer from "@/components/Footer";
import Script from "next/script";

export default function App({ Component, pageProps }) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min").catch((err) =>
      console.error("Bootstrap JS failed to load", err)
    );
  }, []);

  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cartItems");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const handleAddToCart = (product) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(
        (item) => item.stockNumber === product.stockNumber
      );
      return existingItem
        ? prevCartItems.map((item) =>
          item.stockNumber === product.stockNumber
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        : [...prevCartItems, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (stockNumber) => {
    setCartItems((prevCartItems) =>
      prevCartItems
        .map((item) =>
          item.stockNumber === stockNumber
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  //--------------------------------ShowProduct---------------------------------
  const [productItems, setProductItems] = useState(() => {
    if (typeof window !== "undefined") {
      const savedCart = sessionStorage.getItem("productItems");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (productItems.length === 0) {
        sessionStorage.removeItem("productItems");
      } else {
        sessionStorage.setItem("productItems", JSON.stringify(productItems));
      }
    }
  }, [productItems]);

  const showproduct = (product) => {
    setProductItems([product]);
  };

  //------------------------------------------Wishlist Code----------------------------------------
  const [wishlistItems, setWishlistItems] = useState(() => {
    if (typeof window !== "undefined") {
      const savedWishlist = localStorage.getItem("wishlistItems");
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    }
    return [];
  });
  
  useEffect(() => {
    if (typeof window !== "undefined") {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
    }
  }, [wishlistItems]);

  const handleRemoveFromWishlist = (itemId) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== itemId));
  };

  const handleMoveToCart = (item) => {
    setWishlistItems(wishlistItems.filter((wishItem) => wishItem.id !== item.id));
    setCartItems([...cartItems, item]);
  };

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
        strategy="beforeInteractive"
      />

      {/* Load Owl Carousel */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"
        strategy="lazyOnload"
        onLoad={() => console.log("Owl Carousel loaded")}
      />

      {/* Owl Carousel CSS */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css"
      />
      <GeneralHeader />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}