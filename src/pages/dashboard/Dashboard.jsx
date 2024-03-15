import React, {useState} from "react";
import {useSalesHistoryQuery} from "../../redux/api/sale/saleApi";
import SaleHistoryTable from "../sales/SaleHistoryTable";
import Loader from "../../components/loader/Loader";
import {usePurchasesHistoryQuery} from "../../redux/api/purchase/purchase";
import PurchaseHistoryTable from "../purchase/PurchaseHistoryTable";

const Dashboard = () => {
  const [category, setCategory] = useState("weekly");
  const [history, setHistory] = useState("weekly");
  const {data, isLoading} = useSalesHistoryQuery(category, {
    refetchOnMountOrArgChange: true,
  });
  const {data: purchaseHistory, isLoading: purchaseLoading} =
    usePurchasesHistoryQuery(history, {
      refetchOnMountOrArgChange: true,
    });

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };
  const handlePurchaseHistoryChange = (selectedHistory) => {
    setHistory(selectedHistory);
  };

  const accessTokenString = localStorage.getItem("persist:auth");
  const accessToken = accessTokenString ? JSON.parse(accessTokenString) : null;

  const user = accessToken ? JSON.parse(accessToken.user) : null;

  const token = user ? user.role : null;

  return (
    <div>
      {token === "seller" && (
        <div>
          <h2>
            Sales History -{" "}
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h2>
          <div>
            <button onClick={() => handleCategoryChange("weekly")}>
              Weekly
            </button>
            <button onClick={() => handleCategoryChange("daily")}>Daily</button>
            <button onClick={() => handleCategoryChange("monthly")}>
              Monthly
            </button>
          </div>

          <div>{isLoading ? <Loader /> : <SaleHistoryTable data={data} />}</div>
        </div>
      )}
      {token === "buyer" && (
        <div>
          <h2>
            Purchases History -{" "}
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h2>
          <div>
            <button onClick={() => handlePurchaseHistoryChange("weekly")}>
              Weekly
            </button>
            <button onClick={() => handlePurchaseHistoryChange("daily")}>
              Daily
            </button>
            <button onClick={() => handlePurchaseHistoryChange("monthly")}>
              Monthly
            </button>
          </div>
          <div>
            {purchaseLoading ? (
              <Loader />
            ) : (
              <PurchaseHistoryTable data={purchaseHistory} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
