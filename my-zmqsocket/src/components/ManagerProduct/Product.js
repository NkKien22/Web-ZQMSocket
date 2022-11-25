import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Moda } from "react-bootstrap";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { Drawer, Form, Menu, Pagination, Input } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { URL_API } from "../../utils/common";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
  ]),
];
function ProductManager() {
  const [empdata, empdatachange] = useState(null); //Thêm link api get all user
  const [data, setData] = useState([]); //Thêm link api get all user
  const [openFormOrder, setOpenOrder] = useState(false);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState();
  const onChangePage = (page, pageSize) => {
    setCurrentPage(page);
    getAllProduct(page, 12);
  };
  const LoadDetail = (id) => {
    navigate("/QLSanPham/detail/" + id);
  };
  const LoadEdit = (id) => {
    navigate("/QLSanPham/edit/" + id);
  };
  const Removefunction = (id) => {
    if (window.confirm("Bạn có chắn chắn muốn xóa tài khoản này?")) {
      fetch("http://localhost:8000/employee/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Removed successfully.");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  const getAllProduct = (page, pageSize) => {
    axios
      .get(
        `${URL_API}/Product/get-product?pageNum=${page}&pageSize=${pageSize}`
      )
      .then((res) => {
        setData(res.data.item);
        setTotal(parseInt(res.data.message.split(" ")[0]));
      });
  };

  useEffect(() => {
    getAllProduct(1, 10);
  }, []);

  const onClose = () => {
    setOpenOrder(false);
  };

  const onFinish = (values) => {
    const payload = {
      productName: values.productName,
      brandName: values.brandName,
      importPrice: values.importPrice,
      price: values.price,
      quantity: values.quantity,
      images: [],
      options: [
        {
          optionName: "Đỏ",
          optionValue: "20",
        },
      ],
    };
    axios.post(`${URL_API}/Product/add-product` ,payload).then((res) => {
      onClose();
    });
    console.log(values);
  };

  return (
    <div class="row">
      <div className="col-sm-2">
        <Menu
          // onClick={onClick}
          style={{ width: 256 }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
        />
      </div>
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded col-sm-10">
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
              <b>Quản lý sản phẩm</b>
            </h2>
          </div>
          <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
            <Button
              variant="primary"
              onClick={() => {
                setOpenOrder(true);
              }}
            >
              Thêm sản phẩm
            </Button>
          </div>
        </div>
        <div class="row">
          <div class="table-responsive ">
            <table class="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Hình ảnh</th>
                  <th>Tên SP </th>
                  <th>Thuơng hiệu</th>
                  <th>Giá bán </th>
                  <th>Số lượng</th>
                  <th>Tùy chọn</th>
                </tr>
              </thead>
              <tbody>
                {data.map((a, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <img src={a.anh} class="img-thumbnail" width={50}></img>
                    <td>{a.productName}</td>
                    <td>{a.brandName}</td>
                    <td>{a.price} </td>

                    <td>{a.quantity} </td>
                    <td>
                      <a
                        
                        class="view"
                        title="View"
                        data-toggle="tooltip"
                        style={{ color: "#10ab80", margin: "10px" }}
                        onClick={() => {
                          LoadDetail(a.id);
                        }}
                      >
                        <VisibilityTwoToneIcon />
                      </a>
                      <a
                        href="QLSanPham/eidt"
                        class="edit"
                        title="Edit"
                        data-toggle="tooltip"
                        onClick={() => {
                          LoadEdit(a.id);
                        }}
                      >
                        <EditTwoToneIcon />
                      </a>
                      <a
                        href="#"
                        class="delete"
                        title="Delete"
                        data-toggle="tooltip"
                        style={{ color: "red", margin: "10px" }}
                        onClick={() => {
                          Removefunction(a.id);
                        }}
                      >
                        <DeleteTwoToneIcon />
                      </a>
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
                pageSize={12}
              />
            )}
          </div>
        </div>
      </div>
      <Drawer
        title="Thong tin dặt hàng"
        placement="right"
        onClose={onClose}
        open={openFormOrder}
      >
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="productName"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập sản phẩm",
              },
            ]}
          >
            <Input placeholder="Tên Sản Phẩm" />
          </Form.Item>

          <Form.Item
            name="brandName"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập thương hiệu!",
              },
            ]}
          >
            <Input placeholder="Thương Hiệu" />
          </Form.Item>

          <Form.Item
            name="price"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giá bán",
              },
            ]}
          >
            <Input placeholder="Giá Bán" />
          </Form.Item>

          <Form.Item
            name="quantity"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số lượng",
              },
            ]}
          >
            <Input type="number" placeholder="Số Lượng" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default ProductManager;
