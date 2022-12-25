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

function Promotion() {
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
      discountValue: values.discountValue,
      startDay: dateStart,
      lastDay: dateEnd,
      variantId: values.variantId,
    };

    const payloadUpdate = {
      id,
      startDay: dateStart?.split("T")[0].includes("12:00:00") ? dateStart?.split("T")[0] : dateStart?.split("T")[0]+" 12:00:00",
      lastDay: dateEnd?.split("T")[0].includes("12:00:00") ? dateEnd?.split("T")[0] : dateEnd?.split("T")[0]+" 12:00:00",
    };

    isAdd ? 
    axios.post(`${URL_API}/Discount/add-ProductDiscount`, payloadAdd).then((res) => {
      onCloseFormAdd();
      notification.success({
        message: "Thêm thành công",
      });
      getAllDiscount();
    })
    :
    axios.put(`${URL_API}/Discount`, payloadUpdate).then((res) => {
      onCloseFormEdit();
      notification.success({
        message: "Sửa thành công",
      });
      getAllDiscount();
    });
  };

  const getAllDiscount = () => {
    axios.get(`${URL_API}/Discount`).then((res) => {
      setData(res.data.item);
    });
  };

  useEffect(() => { 
    getAllDiscount();
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
          getAllDiscount()
      })
  };
  return (
    <div class="container-fluid">
      <div className="col-sm-2">
        <SideBar isActive="5"/>
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
              <b>Quản lí khuyến mãi</b>
            </h2>
          </div>
        </div>
        <div class="row">
          <div class="table-responsive ">
            <table class="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th>Ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th>Phần trăm giảm giá</th>
                  <th>Ngày tạo</th>
                  <th>Ngày bắt đầu</th>
                  <th>Ngày kết thúc</th>
                  <th>Gía nhập</th>
                  <th>Gía bán</th>
                  <th>Số lượng</th>
                </tr>
              </thead>
              <tbody>
                  {data.map((a) => (  
                    <tr>
                      <img src={a.image} class="img-thumbnail" width={50}></img>
                      <td>{a.productName}</td>
                      <td>{a.discountValue}</td>
                      <td>{a.createAt}</td>
                      <td>{a.startDay}</td>
                      <td>{a.lastDay}</td>
                      <td>{a.importPrice}</td>
                      <td>{a.price}</td>
                      <td>{a.quantity}</td>
                      <td>
                      </td>
                  </tr>
                  ))}
              </tbody>
            </table>
            <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
            <Button
              variant="primary"
              onClick={() => {
                setOpenFormAdd(true);
              }}
            >
              Thêm khuyến mãi
            </Button>
          </div>
          <Drawer
          title="Thêm khuyến mãi"
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
              <Input type="number" placeholder="Tên Sản Phẩm" />
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
              <Input type="number" placeholder="Số lượng" />
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
            {/* {data.length > 0 && (
              <Pagination
                current={currentPage}
                onChange={onChangePage}
                total={total}
                pageSize={10}
              />
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Promotion;