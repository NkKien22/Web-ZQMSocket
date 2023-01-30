import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Drawer,
  Form,
  Menu,
  Pagination,
  Input,
  Button,
  Modal,
  notification,
  Table,
  Tag,
  Popconfirm,
} from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { URL_API } from "../../utils/common";
import { SideBar } from "../Sidebar/SideBar";
import { formatPrice } from "../../helpers";
import confirmOrder from "./confirmOrder";
// page
function ClientInvoice() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [orders, setOrders] = useState([]);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [dataOrderDetail, setDataOrderDetail] = useState([]);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [orderDetail, setOrderDetail] = useState();
  const [onAdd, setOnAdd] = useState(false);
  const [EMEI, setEMEI] = useState();
  const [EMEIs, setEMEIs] = useState([]);
  const [orderId,setOrderId] = useState()

  useEffect(() => {
    getAllInvoice();
    setOnAdd(false);
  }, [onAdd]);

  const onChangePage = (page, pageSize) => {
    setCurrentPage(page);
    getAllInvoice(page, 10);
  };

  const getAllInvoice = () => {
    axios.get(`${URL_API}/Order/get-order-revenue-statistics`).then((res) => {
      let totalCost = 0;
      setData(
        res?.data?.map((x) => {
          totalCost += x?.totalCost;
          return {
            key: x?.id,
            fullName: x?.fullName,
            address: x?.address,
            phoneNumber: x?.phones,
            totalCost: x?.totalCost,
            profit: x?.profit,
            orderStatus: x?.orderStatus,
          };
        })
      );
      setOrders(res.data);
      setTotalCost(totalCost);
    });
  };

  const viewEdit = (id) => {
    setOrderId(id);
    setOpenModalEdit(true);
    let order = orders?.find((x) => {
      return x.id === id;
    });

    var orderDetail = order?.items?.map((x) => ({
      key: x?.id,
      orderId: id,
      variantId: x?.productVariants[0]?.id,
      productName: x?.productName,
      quantity: x?.productVariants[0]?.quantity,
      price: x?.productVariants[0]?.price,
      totalCost: x?.productVariants[0]?.quantity * x?.productVariants[0]?.price,
    }));
    var emeis = orderDetail?.map((el) => ({
      productVariantId: el.variantId,
      quantity: el.quantity,
      emeis: [],
    }));
    setEMEIs(emeis);
    setDataOrderDetail(orderDetail);
  };

  const viewDetail = (id) => {
    setOrderId(id);
    setOpenModalDetail(true);
    let order = orders?.find((x) => {
      return x.id === id;
    });
    setOrderDetail(order);
    var orderDetail = order?.items?.map((x) => ({
      key: x?.id,
      orderId: id,
      variantId: x?.productVariants[0]?.id,
      productName: x?.productName,
      quantity: x?.productVariants[0]?.quantity,
      price: x?.productVariants[0]?.price,
      totalCost: x?.productVariants[0]?.quantity * x?.productVariants[0]?.price,
    }));
    var emeis = orderDetail?.map((el) => ({
      productVariantId: el.variantId,
      quantity: el.quantity,
      emeis: [],
    }));
    setEMEIs(emeis);
    setDataOrderDetail(orderDetail);
  };

  const onChangeEMEI = (props) => {
    setEMEI(props.target.value);
  };

  const setEMEIProduct = (index) => {
    var el = EMEIs;
    var validate = el[index];
    if (validate.quantity <= validate.emeis.length) {
      notification.error({
        message: "EMEIs không được lớn hơn số lượng sản phẩm",
      });
    } else {
      el[index].emeis = [...el[index]?.emeis, EMEI];
      setEMEIs(el);
    }
    setOnAdd(true);
  };

  const deleteEmei = (index, item) => {
    var el = EMEIs;
    el[index].emeis = el[index]?.emeis.filter((emei) => emei !== item);
    setEMEIs(el);
    setOnAdd(true);
  };

  const onUpdateEmeis = () =>{
    let payload = {
      orderItems : EMEIs
    }
    axios.put(`${URL_API}/Order/update-order-emeis/${orderId}`,payload).then((res)=>{
      if (res.status === 200) {
        notification.success({
          message: "Đã đặt lại đơn hàng thành công",
        });
        window.location.reload();
        setOpenModalDetail(false)
      }
    })
    
  }

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleDeleteItem = (record) => {
    let order = orders?.find((x) => {
      return x.id === record.orderId;
    });
    if (order?.items?.length <= 1) {
      notification.warning({
        message: "Không thể xóa sản phẩm cuối cùng",
      });
      return;
    }
    axios
      .delete(
        `${URL_API}/Order/${record.orderId}/update-order/${record.variantId}`
      )
      .then((res) => {
        if (res) console.log(res);
        notification.success({
          message: "Xóa sản phẩm giỏ hàng thành công",
        });
      })
      .then(() => {
        setTimeout(1000);
        window.location.reload();
      });
  };
  const columnsOrderEdit = [
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text) => <a>{formatPrice(text)}</a>,
    },
    {
      title: "Tổng",
      dataIndex: "totalCost",
      key: "totalCost",
      render: (text) => <a>{formatPrice(text)}</a>,
    },
    {
      title: "Xóa",
      dataIndex: "delete",
      key: "delete",
      render: (_, record) => (
        <Popconfirm
          title="Bạn có chắc chắn xóa?"
          onConfirm={() => handleDeleteItem(record)}
        >
          <DeleteOutlined />
        </Popconfirm>
      ),
    },
  ];

  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "fullName",
      key: "fullName",
      render: (text) => <b>{text}</b>,
    },

    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalCost",
      key: "totalCost",
      render: (text) => (
        <span className="text-warning">{formatPrice(text)}</span>
      ),
    },
    {
      title: "Lợi nhuận",
      dataIndex: "profit",
      key: "profit",
      render: (text) => (
        <span className="text-warning">{formatPrice(text)}</span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (_, record) => {
        if (record.orderStatus === 0) {
          return <Tag color="processing">Chờ xử lý</Tag>;
        }
        if (record.orderStatus === 1) {
          return (
            <span>
              <Tag color="processing">Đang xử lý</Tag>
              <Tag color="processing">Giao hàng</Tag>
            </span>
          );
        }
        if (record.orderStatus === 2) {
          return <Tag color="error">Đã hủy</Tag>;
        }
        if (record.orderStatus === 3) {
          return <Tag color="processing">Hoàn thành</Tag>;
        }
        return <Tag color="default">Đang giao</Tag>;
      },
    },
    {
      title: "Xem chi tiết",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => (
        <div>
          {record.orderStatus === 1 ? (
            <Button
              className="ms-2"
              onClick={() => viewEdit(record.key, record)}
            >
              Sửa đơn hàng
            </Button>
          ) : (
            <Button
              className="ms-2"
              onClick={() => viewDetail(record.key, record)}
            >
              Xem
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div class="container-fluid">
      <div className="col-sm-2">
        <SideBar isActive="4" />
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
            <Table
              className="mt-4"
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
              pagination={false}
            />
            <Modal
              title="Chi tiết đơn hàng"
              open={openModalDetail}
              onOk={() => onUpdateEmeis()}
              onCancel={() => setOpenModalDetail(false)}
              width={1000}
              okText="Xác nhận"
              cancelButtonProps={{ style: { display: "none" } }}
            >
              <>
                {orderDetail?.items?.map((el, index) => (
                  <>
                    {" "}
                    <h6>{el.productName}</h6>
                    <Input
                      id="inp-emei"
                      onChange={onChangeEMEI}
                      style={{ width: "80%" }}
                      placeholder="Nhập EMEI của sản phẩm"
                    />
                    <Button
                      style={{ marginLeft: "2%" }}
                      onClick={() => setEMEIProduct(index)}
                    >
                      <PlusOutlined />
                    </Button>
                    <div>
                      {EMEIs[index]?.emeis.map((el, itemIndex) => (
                        <Tag
                          onDoubleClick={() => deleteEmei(index, el)}
                          className="my-2"
                        >
                          <span>{el}</span>
                        </Tag>
                      ))}
                    </div>
                  </>
                ))}
              </>
            </Modal>
            <Modal
              title="Sửa đơn hàng"
              open={openModalEdit}
              onOk={() => setOpenModalEdit(false)}
              onCancel={() => setOpenModalEdit(false)}
              width={1000}
              okText="Đóng"
              cancelButtonProps={{ style: { display: "none" } }}
            >
              <Table
                className="mt-4"
                columns={columnsOrderEdit}
                dataSource={dataOrderDetail}
                pagination={false}
              />
            </Modal>
            {data.length > 0 && (
              <Pagination
                current={currentPage}
                onChange={onChangePage}
                total={total}
                pageSize={10}
              />
            )}
            <h4 className="ms-auto mt-3 float-end">
              <Tag>Tổng lợi nhuận</Tag>:{" "}
              <b className="red">
                <Tag color="red">{formatPrice(totalCost)}</Tag>
              </b>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ClientInvoice;
