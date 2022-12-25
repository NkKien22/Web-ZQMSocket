import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
  Drawer,
  Form,
  Input,
  DatePicker,
  notification,
  Popconfirm,
} from "antd";
import {
  AppstoreOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { URL_API } from "../../utils/common";
import { SideBar } from "../Sidebar/SideBar";
import moment from "moment";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

function ManagerCoupon() {
  
  const [data, setData] = useState([]);
  const [dataDetail, setDataDetail] = useState();

  const [openFormAdd, setOpenFormAdd] = useState(false);
  const onCloseFormAdd = () => {
    setOpenFormAdd(false);
    setData(null);
  };

  const [openFormEdit, setOpenFormEdit] = useState(false);
  const onCloseFormEdit = () => {
    setOpenFormEdit(false);
    setDataDetail(null);
  };

  const onFinish = (values, isAdd, id) => {
    const payloadAdd = {
      couponValue: parseInt(values.couponValue),
      limitedUse: parseInt(values.limitedUse),
      mfg: dateStart,
      exp: dateEnd,
      minimunOrderValue: parseInt(values.minimunOrderValue),
    };

    const payloadUpdate = {
      id,
      mfg: dateStart?.split("T")[0].includes("12:00:00") ? dateStart?.split("T")[0] : dateStart?.split("T")[0]+" 12:00:00",
      exp: dateEnd?.split("T")[0].includes("12:00:00") ? dateEnd?.split("T")[0] : dateEnd?.split("T")[0]+" 12:00:00",
    };

    isAdd ? 
    axios.post(`${URL_API}/Coupon/create-coupon`, payloadAdd).then((res) => {
      onCloseFormAdd();
      notification.success({
        message: "Thêm thành công",
      });
      getAllCoupon();
    })
    :
    axios.put(`${URL_API}/Coupon/update-coupon`, payloadUpdate).then((res) => {
      onCloseFormEdit();
      notification.success({
        message: "Sửa thành công",
      });
      getAllCoupon();
    });
  };

  const getAllCoupon = () => {
    axios.post(`${URL_API}/Coupon/get-all-coupon`).then((res) => {
      setData(res.data.item);
    });
  };

  useEffect(() => { 
    getAllCoupon();
  }, []);

  const getDetailCoupon = (code) => {
    axios.get(`${URL_API}/Coupon/get-coupon-by-code?code=${code}`).then((res) => {
      setDataDetail(res.data.item);
      setDateStart(res.data.item.mfg);
      setDateEnd(res.data.item.exp);
    });
  };

  const [dateStart, setDateStart] = useState();
  const [dateEnd, setDateEnd] = useState();

  // const [start, setStart] = useState();
  // const [end, setEnd] = useState();

  const onChangeDateStart = (date, dateString) => {
    setDateStart(dateString + " 12:00:00");
  };

  const onChangeDateEnd = (date, dateString) => {
    setDateEnd(dateString + " 12:00:00");
  };

  const handleDeleteCoupon = (id) => {
    axios
      .delete(`${URL_API}/Coupon/delete-coupon?code=${id}`)
      .then((res) => {
        if (res)
          notification.success({
            message: "Xóa mã giảm giá thành công",
          });
          getAllCoupon()
      })
  };

  return (
    <div class="container-fluid">
      <div className="col-sm-2">
        <SideBar isActive="3" />
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
              <b>Quản lí mã giảm giá</b>
            </h2>
          </div>
          <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
            <Button
              variant="primary"
              onClick={() => {
                setOpenFormAdd(true);
              }}
            >
              Thêm Mã giảm giá
            </Button>
          </div>
        </div>
        <Drawer
          title="Thêm Mã giảm giá"
          placement="right"
          onClose={onCloseFormAdd}
          open={openFormAdd}
        >
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={(values) => onFinish(values, true)}
            autoComplete="off"
          >
            <Form.Item
              name="couponValue"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã khuyến mãi",
                },
              ]}
            >
              <Input type="text" placeholder="Giảm đơn hàng" />
            </Form.Item>

            <Form.Item
              name="limitedUse"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thương hiệu!",
                },
              ]}
            >
              <Input type="number" placeholder="Số lượng sử dụng" />
            </Form.Item>

            <Form.Item
              name="minimunOrderValue"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập đơn hàng tối thiểu",
                },
              ]}
            >
              <Input type="number" placeholder="Đơn hàng tối thiểu" />
            </Form.Item>

            <Form.Item name="mfg" label="Ngày bắt đầu">
              <DatePicker onChange={onChangeDateStart} />
            </Form.Item>
            <Form.Item name="exp" label="Ngày kết thúc">
              <DatePicker onChange={onChangeDateEnd} />
            </Form.Item>
            <Form.Item
              name="minimunOrderValue"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thương hiệu!",
                },
              ]}
            >
              <Input type="number" placeholder="Số lượng" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
        <Drawer
          title="Sửa khuyến mãi"
          placement="right"
          onClose={onCloseFormEdit}
          open={openFormEdit}
        >
          {dataDetail && (
            <Form
              name="basic"
              initialValues={{
                couponValue: dataDetail.couponValue,
                limitedUse: dataDetail.limitedUse,
                minimunOrderValue: dataDetail.minimunOrderValue,
              }}
              onFinish={(values) => onFinish(values, false, dataDetail.id)}
              autoComplete="off"
            >
              <Form.Item label="Ngày bắt đầu" name="mfg">
                <DatePicker onChange={onChangeDateStart} format={"YYYY-MM-DD"} defaultValue={dateStart ? moment(dateStart.split("T")[0]) : null} />
              </Form.Item>
              <Form.Item name="exp" label="Ngày kết thúc">
                <DatePicker onChange={onChangeDateEnd}  defaultValue={dateEnd ? moment(dateEnd.split("T")[0]) : null} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Xác nhận
                </Button>
              </Form.Item>
            </Form>
          )}
        </Drawer>
        <div class="row">
          <div class="table-responsive ">
            <table class="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã coupon</th>
                  <th>Số lượng sử dụng</th>
                  <th>Yêu cầu đơn hàng</th>
                  <th>Giới hạn sử dụng</th>
                  <th>Ngày bắt đầu</th>
                  <th>Ngày kết thúc</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.filter((a) => a.isCommentEnabled).map((a, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{a.couponCode}</td>
                    <td>{a.numberOfUsed}</td>
                    <td>{a.minimunOrderValue}</td>
                    <td>{a.limitedUse}</td>
                    <td>{a.mfg}</td>
                    <td>{a.exp}</td>
                    <td>
                      <EditOutlined
                        onClick={() => {
                          setOpenFormEdit(true);
                          getDetailCoupon(a.couponCode);
                        }}
                      />
                     <Popconfirm
                        title="Bạn có chắc chắn xóa?"
                        onConfirm={() => handleDeleteCoupon(a.couponCode)}
                      >
                        <DeleteOutlined />
                      </Popconfirm>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ManagerCoupon;
