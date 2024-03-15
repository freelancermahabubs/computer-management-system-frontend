import React, {useEffect, useState} from "react";
import CategoriesModal from "./CategoriesModal";
import CategoriesList from "./CategoriesList";

import Loader from "../../components/loader/Loader";
import {useAllCategoryGetQuery} from "../../redux/api/categories/categoriesApi";

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [name, setName] = useState();
  const [nameFieldValue, setNameFieldValue] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filter, setFilter] = useState();
  const {data, isLoading, refetch} = useAllCategoryGetQuery(filter, {
    refetchOnMountOrArgChange: true,
  });
  const initialData = data?.data;

  useEffect(() => {
    setFilter((prevFilter) => ({
      ...prevFilter,
    }));
  }, []);
  useEffect(() => {
    const updatedFilter = {...filter};

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
  }, [name, refetch, searchTerm]);

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
      <header className="header text-white ">
        <div className="header-info">
          <h1 className="page-header">Category List</h1>
          <hr className="mb-3" />
        </div>
      </header>

      <div className="d-flex gap 5">
        <div className="input-group">
          <div className=" position-relative">
            <div className="input-group">
              <input
                type="text"
                className="form-control px-35px"
                placeholder="Filter Category"
                value={searchTerm}
                onChange={handleFilterChange}
              />
              <div
                className="input-group-text position-absolute top-0 bottom-0 bg-none border-0 start-0"
                style={{zIndex: 1020}}>
                <i className="fa fa-search opacity-5"></i>
              </div>
            </div>
          </div>
        </div>

        <button
          style={{width: "190px", height: "35px"}}
          className="btn btn-outline-theme"
          onClick={openModal}>
          <i className="fa fa-plus-circle me-1"></i>
          Add Category
        </button>
      </div>
      <div className="tab-content p-4">
        {isModalOpen && (
          <CategoriesModal isModalOpen={isModalOpen} closeModal={closeModal} />
        )}
        {isLoading ? (
          <Loader />
        ) : (
          <div className="tab-pane fade show active">
            <CategoriesList data={initialData} refetch={refetch} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
