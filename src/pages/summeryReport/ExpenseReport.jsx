import moment from "moment";
import React, { useEffect, useState } from "react";


import { useSummaryExpenseReportQuery } from "../../redux/api/reports/reportsApi";
import Pagination from "../../utils/Pagination";
import Currency from "../../Shared/Currency";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const ExpenseReport = () => {
  const store = useSelector((state) => state.store);
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [name, setName] = useState("");
  const [filter, setFilter] = useState({
    limit: pageSize,
    storeId: store.storeId,
  });
  const { data } = useSummaryExpenseReportQuery(filter, {
    refetchOnMountOrArgChange: true,
  });
  const initialData = data?.data?.data;

  const meta = data?.data?.meta;
  const calculateTotal = () => {
    let total = 0;
    // eslint-disable-next-line array-callback-return
    initialData?.map((expense) => {
      total += expense?.amount;
    });
    return total;
  };
  useEffect(() => {
    const updatedFilter = { ...filter };
    updatedFilter.page = page;
    if (name) {
      updatedFilter.expenseName = name;
    }
    if (!name) {
      delete updatedFilter.expenseName;
    }
    setFilter(updatedFilter);
  }, [page, name]);

  const handleFilterChange = (event) => {
    setName(event.target.value);
  };
  return (
    <div>
       <div className="input-group mb-3">
          <div className=" position-relative">
            <div className="input-group">
              <input
                type="text"
                className="form-control px-35px"
                placeholder="Filter"
                value={name}
                onChange={handleFilterChange}
              />
              <div
                className="input-group-text position-absolute top-0 bottom-0 bg-none border-0 start-0"
                style={{zIndex: 1020}}>
                <i className="fa fa-search opacity-5"></i>
              </div>
            </div>
          </div>
        </div>
      <table className="table table-hover text-nowrap">
        <thead>
          <tr>
          <th className="border-top-0 pt-0 pb-2">{t("Serial")}</th>
          <th className="border-top-0 pt-0 pb-2">{t("Name")}</th>
            <th className="border-top-0 pt-0 pb-2">{t("Expense")}</th>
            <th className="border-top-0 pt-0 pb-2"> {t("Date")}</th>
            <th className="border-top-0 pt-0 pb-2">{t("Amount")}</th>
          </tr>
        </thead>
        <tbody>
          {initialData?.map((item, index) => (
            <tr key={index}>
              <td className="align-middle">{index + 1}</td>
              <td className="align-middle">
                <span className=" px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center">
                  {item?.expenseName}
                </span>
              </td>
              <td className="align-middle">
                <span className=" px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center">
                  {item?.expenseCategory?.name}
                </span>
              </td>
              <td className="align-middle">
                <span className=" px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center">
                  {moment(item?.paymentDate).format("DD MMMM YYYY")}
                </span>
              </td>

              <td className="align-middle">
                <span className="badge border border-success text-success px-2 pt-5px pb-5px rounded fs-12px d-inline-flex align-items-center">
                {Currency} : {item?.amount}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="text-end mt-4">
            <td colSpan="6">
              <strong>{t("total")}: {calculateTotal()} {Currency}</strong>
            </td>
          </tr>
        </tfoot>
      </table>
      <Pagination page={page}setPage={setPage} meta={meta} pageSize={pageSize} />
    </div>
  );
};

export default ExpenseReport;
