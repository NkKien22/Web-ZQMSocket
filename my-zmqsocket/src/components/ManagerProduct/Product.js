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
  Tag,
} from "antd";
import Modal from "antd/lib/modal/Modal";
import axios from "axios";
import { URL_API } from "../../utils/common";
import { SideBar } from "../Sidebar/SideBar";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Option from "./Components/Option";
import ProductCreate from "./Create";
import ProductEdit from "./Edit";
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
  const [productEdit,setProductEdit] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const onChangePage = (page, pageSize) => {
    setCurrentPage(page);
    getAllProduct(page, 10);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalEditOpen(false);
  };
  const handleDeleteProduct = (id) => {
    axios
      .delete(`${URL_API}/Product/delete-product-variant/${id}`)
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
    axios.get(`${URL_API}/Product/get-all-product`).then((res) => {
      setData(res.data);
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
      options: values.options,
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
      price: parseInt(values.price),
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

  return (
    <div className="row">
      <div className="col-sm-2">
        <SideBar isActive="1" />
      </div>
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded col-sm-10">
        <div className="row ">
          <div className="col-sm-3 mt-5 mb-4 text-gred">
            <Search placeholder="Tìm kiếm" onSearch={onSearch} enterButton />
          </div>
          <div
            className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"
            style={{ color: "green" }}
          >
            <h2>
              <b>Quản lý sản phẩm</b>
            </h2>
          </div>
          <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
            <Button
              variant="primary"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Thêm sản phẩm
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="table-responsive ">
            <table className="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th>Hình ảnh</th>
                  <th>Tên Sản phẩm </th>
                  <th>Thương hiệu</th>
                  <th>Giá nhập </th>
                  <th>Giá bán </th>
                  <th>Số lượng</th>
                  <th>Tùy chọn</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((product, index) => {
                  return product.productVariants.map(
                    (variant, indexVariant) => (
                      <tr>
                        <img
                          src={variant.images[0]?.thumbnail}
                          className="img-thumbnail"
                          width={50}
                        ></img>
                        <td>
                          {product.productName}{" "}{!variant.isProductVariantEnabled?(<Tag color="#f50">Ngừng bán</Tag>):(<Tag color="#87d068">Đang bán</Tag>)}
                          <Tag className="float-end">{variant.skuId}</Tag>
                        </td>
                        <td>{product.brand}</td>
                        <td>{variant.importPrice} </td>
                        <td>{variant.price} </td>
                        <td>{variant.quantity} </td>
                        <td>
                          <Button
                            className="mx-2"
                            onClick={() => {
                              setIsModalEditOpen(true);
                              setProductEdit(product);
                            }}
                          >
                            <EditOutlined />
                          </Button>
                          <Popconfirm
                            title={`Sản phẩm sẽ chuyển qua trạng thái ngừng bán bạn có đồng ý không ?`}
                            onConfirm={() => handleDeleteProduct(variant.id)}
                          >
                            <Button>
                              <DeleteOutlined />
                            </Button>
                          </Popconfirm>
                        </td>
                      </tr>
                    )
                  );
                })}
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

      <Modal
        title={"Thêm mới sản phẩm"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={"50%"}
      >
        <ProductCreate />
      </Modal>

      <Modal
        title={"Sửa sản phẩm"}
        open={isModalEditOpen}
        onCancel={handleCancel}
        footer={null}
        width={"50%"}
      >
        <ProductEdit {...productEdit} />
      </Modal>
    </div>
  );
}

export default ProductManager;
