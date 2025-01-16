import { Row, Card } from "antd";
import React from "react";

const Cards = ({
  income,
  expense,
  currentBalance,
  showExpensesModal,
  showIncomeModal,
}) => {
  return (
    <div className="p-10">
      <Row className="flex w-[95vw] justify-between flex-wrap gap-10">
        <Card className="shadow-lg p-1 w-[410px]">
          <h2 className="font-semibold text-xl mb-4">Current Balance</h2>
          <p className="m-0">₹{currentBalance}</p>
          <button className="w-full border-2 border-[#2970FF] text-white bg-[#2970FF] rounded-lg h-10 mt-4 hover:bg-white hover:text-[#2970FF]">
            Reset Balance
          </button>
        </Card>

        <Card className="shadow-lg p-1 w-[410px]">
          <h2 className="font-semibold text-xl mb-4">Total Income</h2>
          <p className="m-0">₹{income}</p>
          <button
            className="w-full border-2 border-[#2970FF] text-white bg-[#2970FF] rounded-lg h-10 mt-4 hover:bg-white hover:text-[#2970FF]"
            onClick={showIncomeModal}
          >
            Add Income
          </button>
        </Card>

        <Card className="shadow-lg p-1 w-[410px]">
          <h2 className="font-semibold text-xl mb-4">Total Expenses</h2>
          <p className="m-0">₹{expense}</p>
          <button
            className="w-full border-2 border-[#2970FF] text-white bg-[#2970FF] rounded-lg h-10 mt-4 hover:bg-white hover:text-[#2970FF]"
            onClick={showExpensesModal}
          >
            Add Expenses
          </button>
        </Card>
      </Row>
    </div>
  );
};

export default Cards;
