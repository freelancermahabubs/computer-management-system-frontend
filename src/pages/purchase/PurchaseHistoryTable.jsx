import React from "react";
import {Link} from "react-router-dom";

const PurchaseHistoryTable = ({data}) => {
  console.log(data)
  return (
    <div>
      <div>
        <div className="table-responsive my-3">
          <table className="table table-hover text-nowrap">
            <thead>
              <tr>
                <th className="border-top-0 pt-0 pb-2">Serial</th>
                <th className="border-top-0 pt-0 pb-2">Image</th>
                <th className="border-top-0 pt-0 pb-2">Product Name</th>
          
                <th className="border-top-0 pt-0 pb-2"> Quantity</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((item, index) => (
                <tr key={index}>
                  <td className="align-middle">
                    <Link>{index + 1}</Link>
                  </td>
                  <td className="align-middle">
                    <img
                      style={{
                        objectFit: "cover",
                        height: "40px",
                        width: "40px",
                      }}
                      src={
                        item?.image
                          ? item?.image
                          : "https://i.ibb.co/KjdtK7T/download.png"
                      }
                      alt=""
                    />
                  </td>
                  <td className="align-middle">
                    {item?.productId?.productName}
                  </td>
           
                  <td className="align-middle">{item?.quantity}</td>

                  <td className="align-middle">{item?.productQuantity}</td>

                  <td className="align-middle">
                    {item?.interfaceType?.map((interfaceItem, index) => (
                      <td key={index} className="align-middle">
                        {index + 1}, {interfaceItem}
                      </td>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistoryTable;
