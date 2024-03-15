import React, {useState} from "react";
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";
import {useCategoryCreateMutation} from "../../redux/api/categories/categoriesApi";
import toast from "react-hot-toast";
import {singleImageUpload} from "../../hooks/ImageUpload";
import {Modal} from "react-bootstrap";

const CategoriesModal = ({closeModal, isModalOpen}) => {
  const [isAddingLoading, setIsAddingLoading] = useState(false);
  const [image, setImage] = useState();
  const handleChangeUploadImage = async (event) => {
    const image = event.target.files[0];

    const formData = new FormData();

    formData.append("image", image);

    try {
      await singleImageUpload(formData, setImage);
    } catch (error) {
      alert(error.message);
    }
  };
  const initialValues = {
    name: "",
    image: null,
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Category Name is required"),
  });

  const [categoryCreate] = useCategoryCreateMutation();
  const handleSubmit = async (values, {resetForm}) => {
    setIsAddingLoading(true);
    values.image = image;

    const res = await categoryCreate(values);
    if (res?.data) {
      toast.success("Category Create Successful");
      resetForm(initialValues);
    }
    setIsAddingLoading(false);
    closeModal();
  };
  return (
    <Modal show={isModalOpen} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title> Add Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {() => (
            <Form>
              <div className="mx-auto  px-2">
                <div className="form-group col-md-12">
                  <label htmlFor="name" className="py-2">
                    Name
                    <span className="field_required"></span>
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Enter Category Name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12 form-type-line file-group">
                    <label htmlFor="image" className="py-2">
                      Image
                    </label>

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
                <div className="modal-footer mt-4">
                  <button
                    className="btn btn-outline-default"
                    onClick={() => closeModal()}
                    disabled={isAddingLoading}>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-outline-theme"
                    disabled={isAddingLoading}>
                    {isAddingLoading ? (
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"></span>
                    ) : (
                      " Add Category"
                    )}
                    <i className="fa fa-save px-2"></i>
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default CategoriesModal;
