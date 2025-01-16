import { Table, Select, Radio } from "antd";
import React, { useEffect, useState } from "react";
import { unparse,parse } from "papaparse";
import { toast } from "react-toastify";

const TransactionsTable = ({ transactions ,addTransaction,fetchTransaction}) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  let filteredTransactions = transactions.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      item.type.includes(typeFilter)
  );

  let sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });

  const dataSource = sortedTransactions.map((transactions, index) => ({
    key: index,
    ...transactions,
  }));

  function exportCSV(){
    var csv=unparse({
        fields:["name","amount","type","tag","date"],
        data:transactions
    })
    var data=new Blob([csv],{type:"text/csv;charset=utf-8"})
    var csvURL=window.URL.createObjectURL(data);
    const tempLink=document.createElement("a")
    tempLink.href=csvURL;
    tempLink.downland="transactions.csv"
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  }

  function importFromCsv(event){
    event.preventDefault();
    try {
      parse(event.target.files[0],{
        header:true,
        complete:async function(results){
          for(const transaction of results.data){
            console.log("Transactions",transaction)
            const newTransaction={
              ...transaction,
              amount:parseInt(transaction.amount)
            }
            await addTransaction(newTransaction);
          }
        }
      })
      toast.success("All Transaction Added")
      fetchTransaction();
      event.target.files=null;
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="w-full px-4 py-0">
      <div className="flex justify-between gap-2 items-center mb-2">
        <div
          className="flex justify-start items-center gap-2 w-[95%] rounded-lg py-0 px-2 h-10 bg-white mb-3"
          style={{
            boxShadow: "0px 0px 30px 8px rgba(277,277,277,0.75)",
          }}
        >
          <img src="" alt="" width="16" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border-0 focus:outline-none"
            placeholder="search by name"
          />
        </div>
        <Select
          className="w-[30vw] mr-10 flex items-center border-none"
          style={{
            boxShadow: "0px 0px 30px 8px rgba(277,277,277,0.75)",
          }}
          onChange={(val) => setTypeFilter(val)}
          value={typeFilter}
          placeholder="Filter"
          allowClear
        >
          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
      </div>
      <div className="flex justify-between mb-3 w-full items-center">
        <div>
          <h2 className=" font-bold text-2xl">My Transactions</h2>
        </div>
        <Radio.Group
          className="input-radio"
          onChange={(e) => setSortKey(e.target.value)}
          value={sortKey}
        >
          <Radio.Button value="">No Sort</Radio.Button>
          <Radio.Button value="date">Sort by Date</Radio.Button>
          <Radio.Button value="amount">Sort by Amount</Radio.Button>
        </Radio.Group>
        <div className="flex justify-center gap-2 w-[400px]">
          <button className="w-full border-2 border-[#2970FF] text-[#2970FF] bg-white rounded-lg h-10" onClick={exportCSV}>
            Export to CSV
          </button>

          <label
            for="file-csv"
            className="w-full border-2 border-none text-white bg-[#2970FF] rounded-lg h-10 flex items-center justify-center"
          >
            Import from CSV
          </label>
          <input
            id="file-csv"
            type="file"
            accept=".csv"
            onChange={importFromCsv}
            required
            style={{ display: "none" }}
          />
        </div>
      </div>
      <Table dataSource={sortedTransactions} columns={columns} />
    </div>
  );
};

export default TransactionsTable;
