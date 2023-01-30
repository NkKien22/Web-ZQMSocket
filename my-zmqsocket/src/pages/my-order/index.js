import { Button, Modal, notification, Table, Tag, Popconfirm } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatPrice } from "../../helpers";
import { URL_API } from "../../utils/common";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

export const MyOrder = (props) => {
  const { userId } = props;
  const [data, setData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [dataOrderDetail, setDataOrderDetail] = useState([]);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const getOrder = (userId) => {
    axios.get(`${URL_API}/Order/${userId}/get-order`).then((res) => {
      setData(
        res?.data?.map((x) => ({
          key: x?.id,
          fullName: x?.fullName,
          address: x?.address,
          phoneNumber: x?.phones,
          totalCost: x?.totalCost,
          orderStatus: x?.orderStatus,
        }))
      );
      setOrders(res.data);
    });
  };

  const cancelOrder = (id) => {
    axios
      .put(`${URL_API}/Order/update-order-status/${id}`, { orderStatus: 2 })
      .then((res) => {
        notification.success({
          message: "Hủy đơn hàng thành công",
        });
        window.location.reload();
      });
  };
  const reOrder = (id) => {
    axios
      .put(`${URL_API}/Order/update-order-status/${id}`, { orderStatus: 0 })
      .then((res) => {
        if (res.status === 200) {
          notification.success({
            message: "Đã đặt lại đơn hàng thành công",
          });
        }
        window.location.reload();
      });
  };
  const receptOrder = (id) => {
    axios
      .put(`${URL_API}/Order/update-order-status/${id}`, { orderStatus: 3 })
      .then((res) => {
        notification.success({
          message: "Hủy đơn hàng thành công",
        });
        window.location.reload();
      });
  };

  const viewDetail = (id) => {
    setOpenModalDetail(true);
    let order = orders?.find((x) => {
      return x.id === id;
    });
    var orderDetail = order?.items?.map((x) => ({
      key: x?.id,
      orderId: id,
      productName: x?.productName,
      quantity: x?.productVariants[0]?.quantity,
      price: x?.productVariants[0]?.price,
      totalCost: x?.productVariants[0]?.quantity * x?.productVariants[0]?.price,
    }));
    setDataOrderDetail(orderDetail);
  };
  
  const viewEdit = (id) => {
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
    setDataOrderDetail(orderDetail);
  };

  const handleDeleteItem = (record) => {
    console.log(record);
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
      .delete(`${URL_API}/Order/${record.orderId}/update-order/${record.variantId}`)
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
  ].filter(item => !item.hidden);;

  const columnsOrderDetail = [
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
  ];

  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "fullName",
      key: "fullName",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
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
      title: "Trạng thái",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (_, record) => {
        if (record.orderStatus === 0) {
          return (
            <Tag color="geekblue">
              <b>Chờ xử lý</b>
            </Tag>
          );
        }
        if (record.orderStatus === 1) {
          return (
            <span>
              <Tag color="processing">
                <b>Đang xử lý</b>
              </Tag>
              <Tag color="processing">
                <b>Giao hàng</b>
              </Tag>
            </span>
          );
        }
        if (record.orderStatus === 2) {
          return (
            <Tag color="error">
              <b>Đã hủy</b>
            </Tag>
          );
        }
        if (record.orderStatus === 3) {
          return (
            <Tag color="success">
              <b>Hoàn thành</b>
            </Tag>
          );
        }
        return (
          <Tag color="default">
            <b>Đang giao</b>
          </Tag>
        );
      },
    },
    {
      title: "Xem chi tiết",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => (
        <div>
          {record.orderStatus === 2 ? (
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
          {record.orderStatus === 2 ? (
            <Button className="ms-2" onClick={() => reOrder(record.key)}>
              Đặt lại
            </Button>
          ) : (
            <Button
              className="ms-2"
              onClick={() => cancelOrder(record.key)}
              disabled={record.orderStatus !== 0}
            >
              Hủy
            </Button>
          )}
          <Button
            className="ms-2"
            onClick={() => receptOrder(record.key)}
            disabled={record.orderStatus !== 1}
          >
            Đã nhận hàng
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (userId) getOrder(userId);
  }, [userId]);
  return (
    <div className="container">
      <Table
        className="mt-4"
        columns={columns}
        dataSource={data}
        pagination={false}
      />
      <Modal
        title="Chi tiết đơn hàng"
        open={openModalDetail}
        onOk={() => setOpenModalDetail(false)}
        onCancel={() => setOpenModalDetail(false)}
        width={1000}
        okText="Đóng"
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Table
          className="mt-4"
          columns={columnsOrderDetail}
          dataSource={dataOrderDetail}
          pagination={false}
        />
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
    </div>
  );
};
