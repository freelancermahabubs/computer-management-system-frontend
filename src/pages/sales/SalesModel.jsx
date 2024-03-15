import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {useSingleProductGetQuery} from "../../redux/api/product/productApi";
import toast from "react-hot-toast";
import {useSaleCreateMutation} from "../../redux/api/sale/saleApi";

const SalesModel = ({closeModal, sales, id}) => {
  const {data} = useSingleProductGetQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  
  const [quantity, setQuantity] = useState(data ? data.quantitySold : 1);
  const [buyerName, setBuyerName] = useState("");
  const [saleDate, setSaleDate] = useState("");
  const [saleCreate] = useSaleCreateMutation();

  const handleSale = async (e) => {
    e.preventDefault();

    const saleData = {
      productId: id,
      quantitySold: quantity,
      buyerName: buyerName,
      saleDate: saleDate,
    };

    try {
      const res = await saleCreate(saleData);
  
      if (res?.data) {
        toast.success(res?.data?.message);
        sales(saleData);
      }
    } catch (error) {
      // Handle error, show toast, etc.
      console.error("Error creating sale:", error);
    }
  };

  return (
    <Modal show={true} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sales</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSale}>
          <label>
            Quantity Sold:
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
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
            />
          </label>
          <br />

          <label>
            Date of Sale:
            <input
              type="date"
              value={saleDate}
              onChange={(e) => setSaleDate(e.target.value)}
            />
          </label>
          <br />

          <Button variant="danger" type="submit">
            Sale
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

export default SalesModel;
