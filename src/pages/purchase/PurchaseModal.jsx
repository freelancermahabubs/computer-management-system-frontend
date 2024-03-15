import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {useSingleProductGetQuery} from "../../redux/api/product/productApi";
import toast from "react-hot-toast";

import {usePurchaseCreateMutation} from "../../redux/api/purchase/purchase";

const PurchaseModal = ({closeModal, purchase, user, id}) => {
  const {data} = useSingleProductGetQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const [quantity, setQuantity] = useState(data ? data.quantitySold : 1);
  const [buyerName, setBuyerName] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [purchaseCreate] = usePurchaseCreateMutation();
console.log(id)
  const handleSale = async (e) => {
    e.preventDefault();

    const purchaseData = {
      productId: id,
      quantity: parseFloat(quantity),
      buyerName: buyerName | user.name,
      purchaseDate: purchaseDate,
    };
   

    try {
      const res = await purchaseCreate(purchaseData);

      if (res?.data) {
        toast.success(res?.data?.message);
        // purchase(purchaseData);
      }
    } catch (error) {
      // Handle error, show toast, etc.
      console.error("Error creating Purchase:", error);
    }
  };

  return (
    <Modal show={true} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Purchases</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSale}>
          <label>
            Quantity:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </label>
          <br />

          <label>
            Buyer Name:
            <input
              type="text"
              defaultValue={user?.name}
              onChange={(e) => setBuyerName(e.target.value)}
            />
          </label>
          <br />

          <label>
            Date of Purchase:
            <input
              type="date"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
            />
          </label>
          <br />

          <Button variant="danger" type="submit">
            PUrchase
          </Button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PurchaseModal;
