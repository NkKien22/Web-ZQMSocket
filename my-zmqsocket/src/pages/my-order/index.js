import { Button, notification, Table, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatPrice } from "../../helpers";
import { URL_API } from "../../utils/common";

export const MyOrder = (props) => {
  const { userId } = props;
  const [data, setData] = useState([]);
  const getOrder = (userId) => {
    axios
      .get(`${URL_API}/Order/get-order-user?userId=${userId}`)
      .then((res) => {
        console.log(res);
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
            // onClick={() => viewDetail(record.key, record)}
          >
            Xem
          </Button>
          
          <Button className="ms-2" onClick={() => cancelOrder(record.key)} disabled={record.orderStatus === "Cancel"}>
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
    </div>
  );
};
