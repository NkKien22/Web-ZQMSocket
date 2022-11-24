import React from "react";
import Cards from "./Cards";
import Table from "./Table";
import "../ThongKe/ThongKe.css";
const ThongKe = () => {
  return (
    <div className="ThongKe">
      <h1>Thống Kê</h1>
      <Cards />
      <Table />
    </div>
  );
};

export default ThongKe;