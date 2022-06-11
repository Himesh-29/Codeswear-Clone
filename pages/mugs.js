import React from "react";
import Link from "next/link";

const Mugs = ({ products }) => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container py-24 min-w-full">
          <div className="flex flex-wrap justify-center">
            {products.length === 0 ? (
              <p>
                Sorry, all the mugs are currently out of stock. New stock coming
                soon!
              </p>
            ) : (
              Array.from(products).map((product) => {
                return (
                  <Link key={product._id} href={`/product/${product.slug}`}>
                    <div className="lg:w-1/6 md:w-1/3 p-4 w-full shadow-md text-center mx-3 my-3 cursor-pointer transition ease-linear delay-150 hover:scale-110">
                      <a
                        className="w-full"
                        style={{ textAlign: "-webkit-center" }}
                      >
                        <img alt="ecommerce" src={product.image} />
                      </a>
                      <div className="mt-4">
                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                          {product.category}
                        </h3>
                        <h2 className="text-gray-900 title-font text-lg font-medium">
                          {product.title}
                        </h2>
                        <div
                          className="mt-1"
                          style={{ textAlign: "-webkit-center" }}
                        >
                          <div className=" bg-sky-400 text-white w-fit px-2 py-1 rounded font-semibold transition ease-linear delay-150 hover:scale-110">
                            ₹ {product.price}
                          </div>
                        </div>
                        <p className="mt-1 font-bold">
                          Colour: {product.color}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${process.env.HOST}/api/getproducts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category: "Mugs" }),
  });
  const data = await res.json();
  const products = data.products;

  return { props: { products } };
}

export default Mugs;
