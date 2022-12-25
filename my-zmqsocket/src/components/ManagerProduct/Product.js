import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import {
  Drawer,
  Form,
  Pagination,
  Input,
  Popconfirm,
  notification,
} from "antd";
import axios from "axios";
import { URL_API } from "../../utils/common";
import { SideBar } from "../Sidebar/SideBar";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { Search } = Input;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

function ProductManager() {
  const [data, setData] = useState([]); //Thêm link api get all user
  const [dataSearch, setDataSearch] = useState([]); //Thêm link api get all user
  const [openFormAdd, setOpenFormAdd] = useState(false);
  const [openFormEdit, setOpenFormEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState();
  const onChangePage = (page, pageSize) => {
    setCurrentPage(page);
    getAllProduct(page, 10);
  };

  const handleDeleteProduct = (id) => {
    axios
      .delete(`${URL_API}/Product/delete-product?productID=${id}`)
      .then((res) => {
        if (res)
          notification.success({
            message: "Xóa sản phẩm thành công",
          });
      })
      .then(() => {
        window.location.reload();
      });
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

  const onCloseFormAdd = () => {
    setOpenFormAdd(false);
  };

  const onCloseFormEdit = () => {
    setOpenFormEdit(false);
    setDataDetail(null);
  };

  const onSearch = (value) => {
    axios
      .get(
        `${URL_API}/Product/get-product?pageNum=1&pageSize=12&keyworks=${value}`
      )
      .then((res) => {
        setDataSearch(res.data.item);
      });
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
    axios.post(`${URL_API}/Product/add-product`, payload).then((res) => {
      onCloseFormAdd();
    });
  };

  const onFinishUpdate = (values) => {
    const payload = {
      productId: dataDetail.productID,
      productName: values.productName,
      brandName: values.brandName,
      price: parseInt(values.price) ,
      importPrice: dataDetail.importPrice,
      quantity: parseInt(values.quantity),
      images: dataDetail.images,
      options: dataDetail.options,
    };
    axios.put(`${URL_API}/Product/update-product`, payload).then((res) => {
      onCloseFormEdit();
      notification.success({
        message: res.data.message,
      });
      getAllProduct(1, 10);
    });
  };

  const [dataDetail, setDataDetail] = useState();
  const getDetailProduct = (id) => {
    axios
      .get(`${URL_API}/Product/get-product-detail-by-id?id=${id}`)
      .then((res) => {
        setDataDetail(res.data.item);
      });
  };

  console.log(dataDetail);

  return (
    <div class="row">
      <div className="col-sm-2">
        <SideBar isActive="1" />
      </div>
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded col-sm-10">
        <div class="row ">
          <div class="col-sm-3 mt-5 mb-4 text-gred">
            <Search placeholder="Tìm kiếm" onSearch={onSearch} enterButton />
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
                setOpenFormAdd(true);
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
                  <th>Tên Sản phẩm </th>
                  <th>Thương hiệu</th>
                  <th>Giá bán </th>
                  <th>Số lượng</th>
                  <th>Tùy chọn</th>
                </tr>
              </thead>
              <tbody>
                {((dataSearch.length > 0 && dataSearch) || data).map(
                  (a, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <img src={a.anh} class="img-thumbnail" width={50}></img>
                      <td>{a.productName}</td>
                      <td>{a.brandName}</td>
                      <td>{a.price} </td>

                      <td>{a.quantity} </td>
                      <td>
                        <a
                          onClick={() => {
                            setOpenFormEdit(true);
                            getDetailProduct(a.productID);
                          }}
                        >
                          <EditOutlined />
                        </a>
                        <Popconfirm
                          title="Bạn có chắc chắn xóa?"
                          onConfirm={() => handleDeleteProduct(a.productID)}
                        >
                          <DeleteOutlined />
                        </Popconfirm>
                      </td>
                    </tr>
                  )
                )}
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
        title="Thêm sản phẩm"
        placement="right"
        onClose={onCloseFormAdd}
        open={openFormAdd}
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
      <Drawer
        title="Sửa sản phẩm"
        placement="right"
        onClose={onCloseFormEdit}
        open={openFormEdit}
      >
        {dataDetail && (
          <Form
            name="basic"
            initialValues={{
              productName: dataDetail.productName,
              brandName: dataDetail.brandName,
              price: dataDetail.price,
              quantity: dataDetail.quantity,
            }}
            onFinish={onFinishUpdate}
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
        )}
      </Drawer>
    </div>
  );
}

export default ProductManager;
