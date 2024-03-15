import React, { useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ReactSelect from "./ReactSelect";
import DatepickerHelper from "./DatepickerHelper";

const ReportHelper = ({
  pageHeader,
  selected,
  selectedDate,
  selecteEnddDate,
  data,
  tableColumns,
  options,
  handleChange,
  handleStartDateChange,
  handleEndDateChange,
}) => {
  const tableRef = useRef(null);

  const exportAsPDF = async () => {
    const input = tableRef.current;

    if (!input) {
      return;
    }
    const canvas = await html2canvas(input);

    const tableWidth = canvas.width;
    const tableHeight = canvas.height;
    const pdfWidth = tableWidth / 9;
    const pdfHeight = tableHeight / 6.84;

    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(canvas, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("report.pdf");
  };

  return (
    <div>
      <div>
        <h1 className="page-header">{pageHeader}</h1>
        <hr className="mb-4" />
        <div className="row gap-3 w-100">
          <div className="col-lg-4 ">
            <ReactSelect options={options} handleChange={handleChange} />
          </div>
          <div className="d-flex col-lg-6 gap-2">
            <div className="col-lg-6 ">
              <DatepickerHelper
                handleDateChange={handleStartDateChange}
                selectedDate={selectedDate}
                placeHolder="Select start date"
              />
            </div>
            <div className="col-lg-6 ">
              <DatepickerHelper
                handleDateChange={handleEndDateChange}
                selectedDate={selecteEnddDate}
                placeHolder="Select end date"
              />
            </div>
            <div className="">
              <button
                onClick={exportAsPDF}
                style={{ width: "100px", height: "35px" }}
                className="btn btn-outline-theme"
              >
                <i
                  className="bi bi-printer pr-2"
                  style={{ marginRight: "5px" }}
                ></i>
                Print
              </button>
            </div>
          </div>
        </div>
      </div>

      {selected ? (
        <div className="data-management table-responsive mt-3" data-id="table">
          <table
            ref={tableRef}
            id="datatable"
            className="table table-bordered table-xs w-100 fw-semibold text-nowrap mb-3"
          >
            <thead>
              <tr>
                <th>No.</th>
                {tableColumns.map((item) => (
                  <th key={item}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-body">
              {data.map((item, index) => (
                <tr key={index + 1}>
                    <td>{index + 1}</td>
                  {Object.values(item).map((value, fieldIndex) => (
                    <td key={fieldIndex}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
            {/* <tfoot>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th>$923,462</th>
                <th>$751,792</th>
                <th className="text-success">$171,670</th>{" "}
               
              </tr>
            </tfoot> */}
          </table>
        </div>
      ) : (
        <p className="text-danger mt-5 text-center">Please select a supplier</p>
      )}
    </div>
  );
};

export default ReportHelper;
