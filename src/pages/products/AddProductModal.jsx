import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
import * as Yup from "yup";
import {singleImageUpload} from "../../hooks/ImageUpload";
import {useProductCreateMutation} from "../../redux/api/product/productApi";
import {useAllCategoryGetQuery} from "../../redux/api/categories/categoriesApi";
import {useAllBrandGetQuery} from "../../redux/api/brands/brandsApi";

import {ErrorMessage, Field, Form, Formik} from "formik";

import Select from "react-select";
import {CardBody} from "../../components/card/card";

import BrandsModal from "../brands/BrandsModal";

import TagsInput from "react-tagsinput";
import CategoriesModal from "../cateories/CategoriesModal";

const AddProductModal = ({show, hide}) => {
  const filter = {};

  const [addcategoryModal, setAddcategoryModal] = useState(false);
  const [addbrandModal, setAddbrandModal] = useState(false);

  const [isAddingLoading, setIsAddingLoading] = useState(false);

  const [productImage, setProductImage] = useState();

  const handleChangeUploadImage = async (event) => {
    const image = event.target.files[0];

    const formData = new FormData();

    formData.append("image", image);

    try {
      await singleImageUpload(formData, setProductImage);
    } catch (error) {
      alert(error.message);
    }
  };

  const initialValues = {
    productName: "",
    productPrice: "",
    productQuantity: Number,
    productImage: productImage,
    category: null,
    brand: null,
    compatibility: [],
    priceRange: {min: "", max: ""},
    interfaceType: [],
    condition: "",
    capacity: "",
  };

  const [productCreate] = useProductCreateMutation();

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

  const validationSchema = Yup.object({
    productName: Yup.string().required("Product Name is required"),
    category: Yup.string().required("Category is required"),
    brand: Yup.string().required("brand is required"),


  });

  const handleSubmit = async (values, {resetForm}) => {
 
    setIsAddingLoading(true);
    values.image = productImage;
    const data = {
      productName: values.productName,
      productPrice: values.productPrice,
      category: values.category,
      brand: values.brand,
      productImage: values.image,
      productQuantity: parseInt(values.productQuantity),
      priceRange: {
        min: parseInt(values.priceRange.min),
        max: parseInt(values.priceRange.max),
      },
      interfaceType: values.interfaceType,
      compatibility: values.compatibility,
      condition: values.condition,
      capacity: values.capacity,
    };



    const res = await productCreate(data);
   

    if (res?.data) {
      toast.success("Product Create Successful");
      resetForm(initialValues);
      setIsAddingLoading(false);
      
    }
    hide();
  };

  return (
    <Modal show={show} onHide={hide} centered size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3 p-2">
          <CardBody>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}>
              {({values, setFieldValue}) => (
                <Form>
                  <div className="d-flex justify-content-center gap-2 ">
                    <div className="form-group col-md-12 ">
                      <label htmlFor="productName">Name</label>
                      <Field
                        type="text"
                        name="productName"
                        className="form-control"
                        placeholder="Enter Product Name"
                      />
                      <ErrorMessage
                        name="productName"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between  gap-2 py-2">
                    <div className="form-group col-md-6">
                      <label htmlFor="interfaceType">Interface Type</label>
                      <Field name="interfaceType">
                        {(props) => (
                          <TagsInput
                            value={props.field.value}
                            onChange={(tags) =>
                              props.form.setFieldValue("interfaceType", tags)
                            }
                            removeKeys={[8, 46]}
                            renderTag={({
                              tag,
                              key,
                              disabled,
                              onRemove,
                              getTagDisplayValue,
                            }) => (
                              <span
                                key={key}
                                className={`react-tagsinput-tag ${
                                  disabled ? "react-tagsinput-tag-disabled" : ""
                                }`}>
                                {getTagDisplayValue(tag)}
                                {!disabled && (
                                  <i
                                    className="react-tagsinput-remove-btn"
                                    onClick={() => onRemove(key)}>
                                    &times;
                                  </i>
                                )}
                              </span>
                            )}
                          />
                        )}
                      </Field>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="compatibility">Compatibility</label>
                      <Field name="compatibility">
                        {(props) => (
                          <TagsInput
                            value={props.field.value}
                            onChange={(tags) =>
                              props.form.setFieldValue("compatibility", tags)
                            }
                            removeKeys={[8, 46]} // Allows removing tags using backspace or delete key
                            renderTag={({
                              tag,
                              key,
                              disabled,
                              onRemove,
                              getTagDisplayValue,
                            }) => (
                              <span
                                key={key}
                                className={`react-tagsinput-tag ${
                                  disabled ? "react-tagsinput-tag-disabled" : ""
                                }`}>
                                {getTagDisplayValue(tag)}
                                {!disabled && (
                                  <i
                                    className="react-tagsinput-remove-btn"
                                    onClick={() => onRemove(key)}>
                                    &times;
                                  </i>
                                )}
                              </span>
                            )}
                          />
                        )}
                      </Field>
                    </div>
                  </div>
                  <div className="d-flex align-items-center  gap-2 py-2">
                    <div className="form-group col-md-6 ">
                      <label htmlFor="category">Category</label>
                      <Field className="form-control" name="category">
                        {(props) => {
                          const handleChange = (option) => {
                            props.form.setFieldValue("category", option.value);
                          };
                          return (
                            <Select
                              classNamePrefix="react-select"
                              options={categoryOptions}
                              isSearchable
                              onChange={handleChange}
                            />
                          );
                        }}
                      </Field>
                      <ErrorMessage
                        name="category"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-group col-md-6 ">
                      <span
                        style={{
                          marginTop: "20px",
                        }}
                        className="btn btn-outline-theme"
                        onClick={() => setAddcategoryModal(true)}>
                        <i className="fa fa-plus-circle me-1"></i>
                        Add
                      </span>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between  gap-2 py-2">
                    <div className="form-group col-md-6 ">
                      <label htmlFor="category">Brand</label>
                      <Field className="form-control" name="brand">
                        {(props) => {
                          const handleChange = (option) => {
                            props.form.setFieldValue("brand", option.value);
                          };
                          return (
                            <Select
                              classNamePrefix="react-select"
                              options={brandOptions}
                              isSearchable
                              onChange={handleChange}
                            />
                          );
                        }}
                      </Field>
                    </div>
                    <div className="form-group col-md-6 ">
                      <span
                        style={{
                          marginTop: "20px",
                        }}
                        className="btn btn-outline-theme"
                        onClick={() => setAddbrandModal(true)}>
                        <i className="fa fa-plus-circle me-1"></i>
                        Add
                      </span>
                    </div>
                  </div>

                  <div className=" py-2">
                    <div className="form-group col-md-6 ">
                      <label htmlFor="productQuantity">Product Quantity</label>
                      <Field
                        type="number"
                        name="productQuantity"
                        className="form-control"
                        placeholder="Enter Product Quantity"
                      />
                      <ErrorMessage
                        name="productQuantity"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-between  gap-2 py-2">
                    <div className="form-group col-md-6 ">
                      <label htmlFor="priceRange.min">Min Price</label>
                      <Field
                        type="text"
                        name="priceRange.min"
                        className="form-control"
                        placeholder="Min Price"
                      />
                    </div>
                    <div className="form-group col-md-6 ">
                      <label htmlFor="priceRange.max">Max Price</label>
                      <Field
                        type="text"
                        name="priceRange.max"
                        className="form-control"
                        placeholder="Max Price"
                      />
                      <ErrorMessage
                        name="priceRange"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-center gap-2 py-2">
                    <div className="form-group col-md-6 ">
                      <label htmlFor="condition">Condition</label>
                      <Field
                        type="text"
                        name="condition"
                        className="form-control"
                        placeholder="Enter Product Condition"
                      />
                      <ErrorMessage
                        name="condition"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-group col-md-6 ">
                      <label htmlFor="capacity">Capacity</label>
                      <Field
                        type="text"
                        name="capacity"
                        className="form-control"
                        placeholder="Enter Product Capacity"
                      />
                      <ErrorMessage
                        name="capacity"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="productPrice">Product Price</label>
                    <Field
                      type="number"
                      name="productPrice"
                      className="form-control"
                      placeholder="Enter Product Price"
                    />
                    <ErrorMessage
                      name="productPrice"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="d-flex gap-4  mt-5 mb-2">
                    <div className="form-group">
                      <label htmlFor="image">Product Image</label>
                      <input
                        type="file"
                        name="image"
                        onChange={handleChangeUploadImage}
                        className="form-control"
                      />
                      <ErrorMessage
                        name="image"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-outline-theme mt-5"
                    disabled={isAddingLoading}
                    onClick={() =>
                      console.log("Form values before submission:", values)
                    }>
                    {isAddingLoading ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"></span>
                    ) : (
                      "Add Product"
                    )}
                    <i className="fa fa-save px-2"></i>
                  </button>
                </Form>
              )}
            </Formik>
          </CardBody>
        </div>
        {addcategoryModal && (
          <CategoriesModal
            isModalOpen={addcategoryModal}
            closeModal={() => setAddcategoryModal(false)}
          />
        )}
        {addbrandModal && (
          <BrandsModal
            isModalOpen={addbrandModal}
            closeModal={() => setAddbrandModal(false)}
          />
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AddProductModal;
