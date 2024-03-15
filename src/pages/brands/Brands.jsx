import React, { useEffect, useState } from "react";
import BrandsModal from "./BrandsModal";
import BrandList from "./BrandList";

import Loader from "../../components/loader/Loader";

import { useAllBrandGetQuery } from "../../redux/api/brands/brandsApi";

const Brands = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [name, setName] = useState();
  const [nameFieldValue, setNameFieldValue] = useState();
  const [page, setPage] = useState(1);

  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState({
    page,
    limit: pageSize,
  
  });
  const { data, isLoading, refetch } = useAllBrandGetQuery(filter, {
    refetchOnMountOrArgChange: true,
  });
  const initialData = data?.data;
 

  useEffect(() => {
    setFilter((prevFilter) => ({
      ...prevFilter,

    }));
  }, []);
  useEffect(() => {
    const updatedFilter = { ...filter };
    updatedFilter.page = page;
    if (name) {
      updatedFilter.name = name;
    }
    if (searchTerm) {
      updatedFilter.searchTerm = searchTerm;
    }
    if (!searchTerm) {
      delete updatedFilter.searchTerm;
    }
    if (!nameFieldValue) {
      delete updatedFilter.name;
    }
    setFilter(updatedFilter);
    refetch();
  }, [name, refetch, searchTerm, page]);

  const handleFilterChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <header className="header text-white">
        <div className="header-info">
          <h1 className="page-header">
          Brand List
          </h1>
          <hr className="mb-3" />
        </div>
      </header>

      <div className="d-flex gap 5">
        <div className="input-group mb-4">
          <div className=" position-relative">
            <div className="input-group">
              <input
                type="text"
                className="form-control px-35px"
                placeholder="Filter Brands"
                value={searchTerm}
                onChange={handleFilterChange}
              />
              <div
                className="input-group-text position-absolute top-0 bottom-0 bg-none border-0 start-0"
                style={{ zIndex: 1020 }}
              >
                <i className="fa fa-search opacity-5"></i>
              </div>
            </div>
          </div>
        </div>

        <button
          style={{ width: "170px", height: "35px" }}
          className="btn btn-outline-theme"
          onClick={openModal}
        >
          <i className="fa fa-plus-circle me-1"></i>
          Add Brand
        </button>
      </div>
      <div className="tab-content">
        {isModalOpen && (
          <BrandsModal isModalOpen={isModalOpen} closeModal={closeModal} />
        )}
        {isLoading ? (
          <Loader />
        ) : (
          <div className="tab-pane fade show active">
            <BrandList data={initialData} refetch={refetch} />
          </div>
        )}
      </div>

    
    </div>
  );
};

export default Brands;
