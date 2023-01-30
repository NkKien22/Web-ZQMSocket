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
} from "@ant-design/icons";
import axios from "axios";
import { URL_API } from "../../utils/common";
import { SideBar } from "../Sidebar/SideBar";
import { formatPrice } from "../../helpers";

const confirmOrder = (props) => {
  console.log(props);
  const onFinish = (value) => {};

  return (
    <>
      <div class="container-fluid">
        <div className="row">
          <div className="offset-lg-3 col-lg-6">
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item className="mt-5">
                <Button type="primary" htmlType="submit">
                  Xác nhận
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};


export default confirmOrder;