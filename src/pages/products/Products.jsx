import React, {useEffect, useState} from "react";
import ReactSelect from "../helpers/ReactSelect";
import {useAllProductGetQuery} from "../../redux/api/product/productApi";
import {Link} from "react-router-dom";

import {useAllBrandGetQuery} from "../../redux/api/brands/brandsApi";
import Loader from "../../components/loader/Loader";
import ProductsList from "./ProductsList";
import Pagination from "../../utils/Pagination";
import AddProductModal from "./AddProductModal";
import {useAllCategoryGetQuery} from "../../redux/api/categories/categoriesApi";

const Products = () => {

  const accessTokenString = localStorage.getItem("persist:auth");
const accessToken = accessTokenString ? JSON.parse(accessTokenString) : null;

const user = accessToken ? JSON.parse(accessToken.user) : null;

const token = user ? user.role : null;
  const [addProductModal, setAddProductModal] = React.useState(false);

  const [category, setcategory] = useState();

  const [brand, setbrand] = useState();

  const [productName, setproductName] = useState();

  const [categoryFieldValue, setcategoryFieldValue] = useState("");
  const [brandFieldValue, setBrandFieldValue] = useState("");
  const [nameFieldValue, setNameFieldValue] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState({
    page,
    limit: pageSize,
  });
  const {data, isLoading, refetch} = useAllProductGetQuery(filter, {
    refetchOnMountOrArgChange: true,
  });
  const initialData = data?.data;
  const meta = data?.meta;

  useEffect(() => {
    const updatedFilter = {...filter};
    updatedFilter.page = page;

    if (!nameFieldValue) {
      delete updatedFilter.productName;
    }
    if (!categoryFieldValue) {
      delete updatedFilter.category;
    }

    if (!brandFieldValue) {
      delete updatedFilter.brand;
    }
    if (brand) {
      updatedFilter.brand = brand;
    }
    if (category) {
      updatedFilter.category = category;
    }
    if (productName) {
      updatedFilter.productName = productName;
    }

    setFilter(updatedFilter);

    refetch();
  }, [productName, page, category, brand]);
  useEffect(() => {
    setFilter((prevFilter) => ({
      ...prevFilter,
    }));
  }, []);
  const handleChange = (values) => {
    setcategoryFieldValue(values.value);
  };
  const handleBrandChange = (values) => {
    setBrandFieldValue(values.value);
  };
  const handleSubmit = () => {
    setcategory(categoryFieldValue);
    setbrand(brandFieldValue);

    setproductName(nameFieldValue);

    // resetForm();
  };

  const {data: categoryData} = useAllCategoryGetQuery(filter, {
    refetchOnMountOrArgChange: true,
  });
  const initialcategoryData = categoryData?.data;

  const {data: brandData} = useAllBrandGetQuery(filter, {
    refetchOnMountOrArgChange: true,
  });
  const initialbrandData = brandData?.data;

  const categoryOptions = initialcategoryData?.map((item) => ({
    value: item?._id,
    label: item?.name,
  }));

  const brandOptions = initialbrandData?.map((item) => ({
    value: item?._id,
    label: item?.name,
  }));

  return (
    <>
      <div>
        <header className="header text-white">
          <div className="header-info d-flex justify-content-between">
            <h1 className="page-header">product List</h1>
            {token === "seller" && (
              <Link>
                <span
                  style={{width: "150px", height: "35px"}}
                  className="btn btn-outline-theme"
                  onClick={() => setAddProductModal(true)}>
                  <i className="fa fa-plus-circle me-1"></i>
                  Add Product
                </span>
              </Link>
            )}
          </div>
          <hr className="mb-2" />
        </header>

        <div className="row gap-3 w-100 mt-3">
          <div className="d-flex col-lg-5 gap-3">
            <div className="col-lg-6 "></div>
            <div className="col-lg-6  ">
              <input
                type="text"
                value={nameFieldValue}
                onChange={(e) => setNameFieldValue(e.target.value)}
                className="form-control p-2"
                placeholder="product name"
              />
            </div>
          </div>
          <div className="col-lg-3 ">
            <ReactSelect
              placeHolder="Select a category"
              options={categoryOptions}
              handleChange={handleChange}
            />
          </div>
          <div className="col-lg-3 ">
            <ReactSelect
              placeHolder="Select a brand"
              options={brandOptions}
              handleChange={handleBrandChange}
            />
          </div>
        </div>
        <div className="mt-3 d-flex gap-2">
          <div className="form-group">
            <button
              onClick={handleSubmit}
              className="btn btn-primary"
              type="submit">
              <i className="fa fa-sliders"></i> Filter
            </button>
          </div>
          <div className="form-group">
            <button
              className="btn btn-info"
              type="button"
              onClick={() => {
                setNameFieldValue("");
                setcategoryFieldValue(null);
                setBrandFieldValue(null);
                setbrand(null);
                setcategory(null);

                const updatedFilter = {...filter};
                delete updatedFilter.productName;
                delete updatedFilter.category;
                delete updatedFilter.brand;

                setFilter(updatedFilter);
                refetch();
              }}>
              Reset
            </button>
          </div>
        </div>

        <div className="row py-3">
          {isLoading ? (
            <Loader />
          ) : (
            <ProductsList data={initialData} refetch={refetch} />
          )}
        </div>
        {addProductModal && (
          <AddProductModal
            show={addProductModal}
            hide={() => setAddProductModal(false)}
          />
        )}
      </div>{" "}
      <Pagination
        page={page}
        setPage={setPage}
        meta={meta}
        pageSize={pageSize}
      />
    </>
  );
};

export default Products;
