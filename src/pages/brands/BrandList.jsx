import React from "react";
import {Link} from "react-router-dom";

const BrandList = ({data}) => {
  return (
    <div>
      <div className="table-responsive">
        <table className="table table-hover text-nowrap">
          <thead>
            <tr>
              <th className="border-top-0 pt-0 pb-2">Serial</th>
              <th className="border-top-0 pt-0 pb-2">Name</th>
              <th className="border-top-0 pt-0 pb-2">Image</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index}>
                <td className="align-middle">
                  <Link>{index + 1}</Link>
                </td>
                <td className="align-middle">{item?.name}</td>
                <td className="align-middle">
                  <img
                    style={{
                      objectFit: "cover",
                      height: "40px",
                      width: "40px",
                    }}
                    src={
                      item?.logo
                        ? item.logo
                        : "https://i.ibb.co/KjdtK7T/download.png"
                    }
                    alt=""
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BrandList;
