import React, {useState} from "react";
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {useBrandCreateMutation} from "../../redux/api/brands/brandsApi";
import {singleImageUpload} from "../../hooks/ImageUpload";
import {Modal} from "react-bootstrap";


const BrandsModal = ({closeModal, isModalOpen}) => {
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
    image: "",
    description: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Brand Name is required"),
    description: Yup.string().optional(),
  });

  const [brandCreate] = useBrandCreateMutation();

  const handleSubmit = async (values, {resetForm}) => {
    setIsAddingLoading(true);
    values.image = image;

    const res = await brandCreate(values);

    if (res?.data) {
      toast.success("Brand Create Successful");
      resetForm(initialValues);
    }
    setIsAddingLoading(false);
    closeModal();
  };
  console.log(isModalOpen);
  return (
    <Modal show={isModalOpen} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Brand</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {() => (
            <Form>
              <div className="d-flex justify-content-center gap-2 py-2">
                {" "}
                <div className="form-group col-md-6 px-2">
                  <label htmlFor="name">
                    Name
                    <span className="field_required">*</span>
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Enter Brand Name..."
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="form-group col-md-6 form-type-line file-group px-2">
                  <label htmlFor="image">Image</label>
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

              <div className="modal-footer">
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
                    "   Add Brand"
                  )}
                  <i className="fa fa-save px-2"></i>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default BrandsModal;
