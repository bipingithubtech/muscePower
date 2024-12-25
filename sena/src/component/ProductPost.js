import React, { useEffect, useState } from "react";
import "../component/ProductPost.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "./Redux.js/Reducer";
import { filterProduct } from "./Redux.js/Reducer";

const ProductPost = () => {
  const [extended, setExtended] = useState(false);
  const [filter, setFilter] = useState({
    minPrice: "",
    maxPrice: "",
    discountPrice: "",
  });

  const { products, loading, error } = useSelector((state) => state.data);
  console.log("product is this ", products);
  const [page, setPage] = useState(1);
  const [rowPage, setRowPage] = useState(6);
  const lastIndex = page * rowPage;
  const firstIndex = lastIndex - rowPage;

  const currentPage = products.slice(firstIndex, lastIndex);
  const totalpage = Math.ceil(products.length / rowPage);
  console.log("product is arra or not", Array.isArray(currentPage));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  const toggleReadMore = () => {
    setExtended((prev) => !prev);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalpage) {
      setPage(newPage);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  const handelFilterApply = () => {
    dispatch(filterProduct(filter));
  };
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="mainProductDiv">
      <div className="product">
        <div className="leftFilterSection">
          <h4>Filter</h4>

          <label>
            Min Price:
            <input
              type="number"
              onChange={handleFilterChange}
              name="minPrice"
              value={filter.minPrice}
            />
          </label>
          <label>
            Max Price:
            <input
              type="number"
              onChange={handleFilterChange}
              value={filter.maxPrice}
              name="maxPrice"
            />
          </label>
          <label>
            Min Discount Price:
            <input
              type="number"
              name="discountPrice"
              value={filter.discountPrice}
              onChange={handleFilterChange}
            />
          </label>
          <button className="applyFilterButton" onClick={handelFilterApply}>
            Apply Filters
          </button>
        </div>

        <div className="rightProduct">
          <div className="postHeader">
            <h2>MuscleBlaze Whey Protein Powder</h2>
            <p>
              {extended
                ? `Whey Protein by MuscleBlaze is the best Indian Whey Protein Powder
                    that helps with quick muscle recovery & prevents muscle breakdown.
                    It’s a complete protein with all the nine essential amino acids.
                    It has a faster and better absorbability as compared to other whey
                    supplements. It is made from premium quality whey isolate protein.
                    You can explore our wide range of best protein powder or protein
                    supplements in India such as Biozyme Whey Protein Isolate, Whey
                    Active, Whey Premium, Whey Prime, etc at affordable prices.`
                : `Whey Protein by MuscleBlaze is the best Indian Whey Protein Powder
                    that helps with quick muscle recovery & prevents muscle breakdown.
                    It’s a complete protein with all the nine essential amino acids...
                  `}
              <label onClick={toggleReadMore} className="readMoreLabel">
                {extended ? "Read less" : "Read more"}
              </label>
            </p>
          </div>

          {/* Products Section */}
          <div className="allProducts">
            {currentPage.map((product) => (
              <div className="myProduct" key={product.id}>
                <img
                  className="productImage"
                  src={`http://localhost:8000${product.imageUrl}`}
                  alt={product.name}
                />
                <p className="productDescription">{product.description}</p>
                <h3 className="productTitle">{product.name}</h3>
                <div className="productPrice">
                  <p className="oldPrice">Price:₹ {product.price}</p>
                  <p className="newPrice">
                    Discounted:₹{product.discountPrice}
                  </p>
                </div>
                <div className="buttons">
                  <button className="addToCartButton">Add to Cart</button>
                  <button className="buyButton">Buy Now</button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Section */}
          <div className="pagination">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="prevButton"
            >
              Previous
            </button>
            {Array.from({ length: totalpage }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={page === index + 1 ? "activePage" : ""}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalpage}
              className="nextButton"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPost;
