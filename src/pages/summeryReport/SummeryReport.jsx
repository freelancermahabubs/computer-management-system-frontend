import DatepickerHelper from "../helpers/DatepickerHelper";
import {Card, CardBody, CardExpandToggler} from "../../components/card/card";
import TablePlugins from "../helpers/TablePlugins";
import $ from "jquery";
import React, {useState} from "react";
import {useSummaryReportQuery} from "../../redux/api/reports/reportsApi";
import ExpenseReport from "./ExpenseReport";
import ReceiveFromCustomer from "./ReceiveFromCustomer";
import PayToSupplier from "./PayToSupplier";
import Currency from "../../Shared/Currency";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const SummeryReport = () => {
  const store = useSelector((state) => state.store);
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selecteEnddDate, setSelectedEndDate] = React.useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [name, setName] = useState("");
  const [filter, setFilter] = useState({
    limit: pageSize,
    storeId: store.storeId,
  });
  const {data} = useSummaryReportQuery(filter);
  const initialData = data?.data;
 
  const tableData = [
    {
      name: "Tiger Nixon",
      position: "System Architect",
      office: "Edinburgh",
      age: 61,
      start_date: "2011/04/25",
      salary: "$320,800",
    },
    {
      name: "Garrett Winters",
      position: "Accountant",
      office: "Tokyo",
      age: 63,
      start_date: "2011/07/25",
      salary: "$170,750",
      read: "dsfsd",
    },
    // Add more data rows here
  ];
  const tableColumns = [
    {title: "Name", data: "name"},
    {title: "Position", data: "nosition"},
    {title: "Office", data: "office"},
    {title: "Age", data: "age"},
    {title: "Start Date", data: "start_date"},
    {title: "Salary", data: "salary"},
  ];
  const tableConfig = {
    createdRow: function (row, data, dataIndex) {
      if (data.name === "Tiger Nixon") {
        $(row).find("td:eq(0)").css("color", "red");
      }
    },
  };
  const customStyles = {
    // backgroundColor: 'lightgray',
    // border: '1px solid black',
    // Add other custom styles as needed
  };

  const handleEndDateChange = (date) => {
    console.log(date);
    setSelectedEndDate(date);
  };
  const handleStartDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <div>
        <h1 className="page-header">{t("Summary Report")}</h1>
        <hr className="mb-4" />

        <div className="d-flex flex-wrap gap-2">
          <div className="">
            <DatepickerHelper
              handleDateChange={handleStartDateChange}
              selectedDate={selectedDate}
              placeHolder="Select start date"
            />
          </div>
          <div className=" ">
            <DatepickerHelper
              handleDateChange={handleEndDateChange}
              selectedDate={selecteEnddDate}
              placeHolder="Select end date"
            />
          </div>
          <div className="">
            <button
              onClick={() => {
                setSelectedDate(null);
                setSelectedEndDate(null);
              }}
              style={{width: "100px", height: "35px"}}
              className="btn btn-outline-theme">
              <i class="bi bi-x-circle" style={{marginRight: "5px"}}></i>
              {t("Reset")}
            </button>
          </div>
        </div>
      </div>
      <div className="row py-3">
        <div className="col-xl-3 col-lg-6">
          <Card className="mb-3">
            <CardBody>
              <div className="d-flex fw-bold small mb-3">
                <span className="flex-grow-1">{t("sale")} {t("Amount")}</span>
                <CardExpandToggler />
              </div>
              <div className="row align-items-center mb-2">
                <div >
                  <h3 className="mb-0">
                  {Currency}  {initialData?.salesAmount.toFixed(2)}
                  </h3>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="col-xl-3 col-lg-6">
          <Card className="mb-3">
            <CardBody>
              <div className="d-flex fw-bold small mb-3">
                <span className="flex-grow-1">{t("purchases")} {t("Cost")}</span>
                <CardExpandToggler />
              </div>
              <div className="row align-items-center mb-2">
                <div >
                  <h3 className="mb-0">
                   {Currency} {initialData?.purchaseAmount.toFixed(2)}
                  </h3>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="col-xl-3 col-lg-6">
          <Card className="mb-3">
            <CardBody>
              <div className="d-flex fw-bold small mb-3">
                <span className="flex-grow-1">{t("Expense")}</span>
                <CardExpandToggler />
              </div>
              <div className="row align-items-center mb-2">
                <div >
                  <h3 className="mb-0">
                  {Currency}   {initialData?.expenseAmount.toFixed(2)}
                  </h3>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="col-xl-3 col-lg-6">
          <Card className="mb-3">
            <CardBody>
              <div className="d-flex fw-bold small mb-3">
                <span className="flex-grow-1">{t("sale")} {t("profit")}</span>
                <CardExpandToggler />
              </div>
              <div className="row align-items-center mb-2">
                <div >
                  <h3 className="mb-0">
                  {Currency}  {initialData?.profitAmount.toFixed(2)}
                  </h3>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="row py-3">
        <div className="col-xl-6">
          <Card className="mb-3">
            <CardBody>
              <div className="d-flex fw-bold small mb-3">
                <span className="flex-grow-1">{t("TOP SALE PRODUCT")}</span>
                <CardExpandToggler />
              </div>
              <div>
                <div className="">
                  <TablePlugins
                    data={tableData}
                    columns={tableColumns}
                    config={tableConfig}
                    tableId="customTable"
                    customStyles={customStyles}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="col-xl-6">
          <Card className="mb-3">
            <CardBody>
              <div className="d-flex fw-bold small mb-3">
                <span className="flex-grow-1">{t("Expense")}</span>
                <CardExpandToggler />
              </div>
              <div className="table-responsive">
                <ExpenseReport />
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="col-xl-6">
          <Card className="mb-3">
            <CardBody>
              <div className="d-flex fw-bold small mb-3">
                <span className="flex-grow-1">{t("Pay To Supplier")}</span>
                <CardExpandToggler />
              </div>
              <div className="table-responsive">
                <PayToSupplier />
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="col-xl-6">
          <Card className="mb-3">
            <CardBody>
              <div className="d-flex fw-bold small mb-3">
                <span className="flex-grow-1">{t("Receive From Customer")}</span>
                <CardExpandToggler />
              </div>

              <div className="row gx-4">
                <ReceiveFromCustomer />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SummeryReport;
