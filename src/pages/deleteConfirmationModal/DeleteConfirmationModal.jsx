import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


const DeleteConfirmationModal = ({
  closeModal,
  confirmDelete,
  isAddingLoading,
}) => {

  return (
    <Modal show={true} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirm </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Delete Message</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          variant="danger"
          disabled={isAddingLoading}
          onClick={confirmDelete}>
          {isAddingLoading ? (
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"></span>
          ) : (
            "Delete"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
