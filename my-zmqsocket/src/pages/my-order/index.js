import { Button, Modal, notification, Table, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatPrice } from "../../helpers";
import { URL_API } from "../../utils/common";

export const MyOrder = (props) => {
  const { userId } = props;
  const [data, setData] = useState([]);
  const [dataOrderDetail, setDataOrderDetail] = useState([]);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const getOrder = (userId) => {
    axios
      .get(`${URL_API}/Order/get-order-user?userId=${userId}`)
      .then((res) => {
        setData(
          res?.data?.item.map((x) => ({
            key: x?.orderId,
            fullName: x?.fullName,
            address: x?.address,
            phoneNumber: x?.phoneNumber,
            total: x?.total,
            orderStatus: x?.orderStatus,
          }))
        );
      });
  };

  const cancelOrder = (id) => {
    axios.delete(`${URL_API}/Order/order-cancel?orderId=${id}`).then((res) => {
      notification.success({
        message: "Hủy đơn hàng thành công",
      });
      window.location.reload();
    });
  };

  const viewDetail = (id) => {
    setOpenModalDetail(true);
    axios.get(`${URL_API}/Order/get-order-detail?orderId=${id}`).then((res) => {
      setDataOrderDetail(
        res?.data?.item.map((x) => ({
          key: x?.orderId,
          productName: x?.productName,
          quantity: x?.quantity,
          unitPrice: x?.unitPrice,
          optionCarts: x?.optionCarts,
        }))
      );
    });
  };

  const columnsOrderDetail = [
    {
      title: "Tên san pham",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "So luong",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Gia",
      dataIndex: "unitPrice",
      key: "unitPrice",
      render: (text) => <a>{formatPrice(text)}</a>,
    },
    {
      title: "Mau",
      dataIndex: "optionCarts",
      key: "optionCarts",
      render: (text) => <a>{text[0].optionValue}</a>,
    },
    {
      title: "RAM",
      dataIndex: "optionCarts",
      key: "optionCarts",
      render: (text) => <a>{text[1].optionValue}</a>,
    },
  ];


  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "fullName",
      key: "fullName",
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
      dataIndex: "total",
      key: "total",
      render: (text) => <a>{formatPrice(text)}</a>,
    },
    {
      title: "Trạng thái",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (_, record) => {
        if (record.orderStatus === "Cancel") {
          return <Tag color="error">{record.orderStatus}</Tag>;
        }
        if (record.orderStatus === "Pending") {
          return <Tag color="processing">{record.orderStatus}</Tag>;
        }
        return <Tag color="default">{record.orderStatus}</Tag>;
      },
    },
    {
      title: "Xem chi tiết",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => (
        <div>
          <Button
            className="ms-2"
            onClick={() => viewDetail(record.key, record)}
          >
            Xem
          </Button>

          <Button
            className="ms-2"
            onClick={() => cancelOrder(record.key)}
            disabled={record.orderStatus === "Cancel"}
          >
            Hủy đơn hàng
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
        title="Chi tiet don hang"
        open={openModalDetail}
        onOk={() => setOpenModalDetail(false)}
        onCancel={() => setOpenModalDetail(false)}
        width={1000}
        okText="Đóng"
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <Table
          className="mt-4"
          columns={columnsOrderDetail}
          dataSource={dataOrderDetail}
          pagination={false}
        />
      </Modal>
    </div>
  );
};
