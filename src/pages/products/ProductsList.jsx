import React, {useState} from "react";
import toast from "react-hot-toast";

import {Link} from "react-router-dom";
import {useDeleteProductMutation} from "../../redux/api/product/productApi";
import DeleteConfirmationModal from "../deleteConfirmationModal/DeleteConfirmationModal";

import SalesModel from "../sales/SalesModel";
import PurchaseModal from "../purchase/PurchaseModal";

const ProductsList = ({data}) => {
  const accessTokenString = localStorage.getItem("persist:auth");
  const accessToken = accessTokenString ? JSON.parse(accessTokenString) : null;

  const user = accessToken ? JSON.parse(accessToken.user) : null;

  const token = user ? user.role : null;

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false);
  const [saleModal, setSaleModal] = useState(false);
  const [purchaseModal, setPurchaseModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState();
  const [isAddingLoading, setIsAddingLoading] = useState(false);

  const [saleId, setSaleId] = useState();
  const [purchaseId, setPurchaseId] = useState();

  const [deleteProduct] = useDeleteProductMutation({});

  const handleDelete = async (id) => {
    setIsAddingLoading(true);
    const res = await deleteProduct(id);
    if (res?.data?.success === true) {
      toast.success(res?.data?.message);
    }
    setIsAddingLoading(false);
    setIsDeleteConfirmationModalOpen(false);
  };

  const openDeleteConfirmationModal = (id) => {
    setIsDeleteConfirmationModalOpen(true);
    setSelectedItemId(id);
  };

  const closeDeleteConfirmationModal = () => {
    setIsDeleteConfirmationModalOpen(false);
  };

  return (
    <div>
      <div className="table-responsive my-3">
        <table className="table table-hover text-nowrap">
          <thead>
            <tr>
              <th className="border-top-0 pt-0 pb-2">Serial</th>
              <th className="border-top-0 pt-0 pb-2">Image</th>
              <th className="border-top-0 pt-0 pb-2">Product Name</th>
              <th className="border-top-0 pt-0 pb-2">Product Price</th>
              <th className="border-top-0 pt-0 pb-2">Category</th>
              <th className="border-top-0 pt-0 pb-2">Brand </th>
              <th className="border-top-0 pt-0 pb-2">Product Quantity </th>
              <th className="border-top-0 pt-0 pb-2">Condition </th>
              <th className="border-top-0 pt-0 pb-2">Interface Type </th>
              <th className="border-top-0 pt-0 pb-2">Compatibility </th>
              <th className="border-top-0 pt-0 pb-2">PriceRange</th>
              <th className="border-top-0 pt-0 pb-2">Sales</th>

              <th className="border-top-0 pt-0 pb-2">Actions </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index}>
                <td className="align-middle">
                  <Link>{index + 1}</Link>
                </td>
                <td className="align-middle">
                  <img
                    style={{objectFit: "cover", height: "40px", width: "40px"}}
                    src={
                      item?.image
                        ? item?.image
                        : "https://i.ibb.co/KjdtK7T/download.png"
                    }
                    alt=""
                  />
                </td>
                <td className="align-middle">{item?.productName}</td>
                <td className="align-middle">{item?.productPrice}</td>

                <td className="align-middle">{item?.category?.name}</td>
                <td className="align-middle">{item?.brand?.name}</td>
                <td className="align-middle">{item?.productQuantity}</td>
                <td className="align-middle">{item?.condition}</td>
                <td className="align-middle">
                  {item?.interfaceType?.map((interfaceItem, index) => (
                    <td key={index} className="align-middle">
                      {index + 1}, {interfaceItem}
                    </td>
                  ))}
                </td>
                <td className="align-middle">
                  <span className="badge border border-success text-success px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center cursor-pointer ">
                    {item?.compatibility?.map((compatibilityItem, index) => (
                      <td key={index} className="align-middle">
                        {index + 1}, {compatibilityItem}
                      </td>
                    ))}
                  </span>
                </td>
                <td className="align-middle">
                  <span className="badge border border-success text-success px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center cursor-pointer ">
                    $ {item?.priceRange?.min} - {item?.priceRange?.max}
                  </span>
                </td>

                {token === "buyer" ? (
                  <td className="align-middle">
                    <span className="badge border border-success text-success px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center cursor-pointer ">
                      <button
                        onClick={() => {
                          setPurchaseId(item?._id);
                          setPurchaseModal(true);
                        }}
                        className="dropdown-item">
                        Purchase
                      </button>
                    </span>
                  </td>
                ) : (
                  <td className="align-middle">
                    <span className="badge border border-success text-success px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center cursor-pointer ">
                      <button
                        onClick={() => {
                          setSaleId(item?._id);
                          setSaleModal(true);
                        }}
                        className="dropdown-item">
                        Sale
                      </button>
                    </span>
                  </td>
                )}
                {token === "seller" && (
                  <td className="align-middle">
                    <span
                      className="badge border border-success text-success px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center cursor-pointer "
                      data-bs-toggle="dropdown">
                      <i className="bi bi-gear fs-9px fa-fw me-5px"></i> E/D
                    </span>

                    <div className="dropdown-menu">
                      <button
                        onClick={() => openDeleteConfirmationModal(item?._id)}
                        className="dropdown-item">
                        <i
                          className="bi bi-trash pr-2"
                          style={{marginRight: "5px"}}></i>
                        Delete
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isDeleteConfirmationModalOpen && (
        <DeleteConfirmationModal
          isAddingLoading={isAddingLoading}
          closeModal={closeDeleteConfirmationModal}
          confirmDelete={() => handleDelete(selectedItemId)}
        />
      )}
      {saleModal && (
        <SalesModel
          closeModal={() => setSaleModal(false)}
          id={saleId}
          sales={saleModal}
        />
      )}
      {purchaseModal && (
        <PurchaseModal
          user={user}
          closeModal={() => setPurchaseModal(false)}
          id={purchaseId}
          purchase={purchaseModal}
        />
      )}
    </div>
  );
};

export default ProductsList;
