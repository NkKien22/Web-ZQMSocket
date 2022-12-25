import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Moda } from "react-bootstrap";
import { Drawer, Form, Menu, Pagination, Input } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { URL_API } from "../../utils/common";
import { SideBar } from "../Sidebar/SideBar";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
// const items = [
//   getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
//     getItem("Option 5", "5"),
//     getItem("Option 6", "6"),
//   ]),
// ];
function ClientInvoice() {
  const LoadInvoice = {
  pageNum: 1,
  pageSize: 10,
  keyworks: "",
  };
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState();
  const onChangePage = (page, pageSize) => {
    setCurrentPage(page);
    getAllInvoice(page, 10);
  };

  const getAllInvoice = () => {
    const start = "2020-12-02 10:10:10";
    const end = "2023-12-02 10:10:10";
    axios
      .get(
        `${URL_API}/Order/get-order-revenue-statistics?Start=${start}&End=${end}`
      )
      .then((res) => {
        setData(res.data.item);
      });
  };

  useEffect(() => {
    getAllInvoice();
  }, []);
  return (
    <div class="container-fluid">
      <div className="col-sm-2">
        <SideBar isActive="4"/>
      </div>
      <div className="crud shadow-lg p-5 bg-body rounded col-sm-10">
        <div class="row ">
          <div class="col-sm-3 mt-5 mb-4 text-gred">
            <div className="search">
              <form class="form-inline">
                <input
                  class="form-control mr-sm-2"
                  type="search"
                  placeholder="Tìm kiếm"
                  aria-label="Search"
                />
              </form>
            </div>
          </div>
          <div
            class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"
            style={{ color: "green" }}
          >
            <h2>
              <b>Quản lí hóa đơn</b>
            </h2>
          </div>
        </div>
        <div class="row">
          <div class="table-responsive ">
            <table class="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên khách hàng</th>
                  <th>Số điện thoại</th>
                  <th>Địa chỉ</th>
                  <th>Tổng Tiền</th>
                  <th>Lợi nhuận</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                  {data.map((a, index) => (  
                    <tr>
                      <td>{index+1}</td>
                      <td>{a.fullName}</td>
                      <td>{a.phoneNumber}</td>
                      <td>{a.address}</td>
                      <td>{a.total}</td>
                      <td>{a.profit}</td>
                      <td>{a.orderStatus}</td>
                      <td>
                      </td>
                  </tr>
                  ))}
              </tbody>
            </table>
            {data.length > 0 && (
              <Pagination
                current={currentPage}
                onChange={onChangePage}
                total={total}
                pageSize={10}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ClientInvoice;