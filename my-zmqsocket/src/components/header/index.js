import { Dropdown, Modal, Input, Space, Menu, Badge, notification } from "antd";
import {
  PhoneOutlined,
  UserOutlined,
  DownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "./styles.css";
import { useEffect, useState } from "react";
import { FormLogin } from "./formLogin";
import { FormRegister } from "./formRegister";
import { REFRESH_TOKEN_KEY, TOKEN_KEY, URL_API } from "../../utils/common";
import Cookies from "js-cookie";
import axios from "axios";
// import "./../../assets/pages/css/components.css";
// import "./../../assets/pages/css/slider.css";
import "./../../assets/pages/css/style-shop.css";
import "./../../assets/plugins/font-awesome/css/font-awesome.min.css";
import "./../../assets/plugins/bootstrap/css/bootstrap.min.css";
import "./../../assets/pages/css/animate.css";
import "./../../assets/plugins/fancybox/source/jquery.fancybox.css";
// import "./../../assets/plugins/owl.carousel/assets/owl.carousel.css";
// import "./../../assets/pages/css/style.css";
import "./../../assets/corporate/css/style.css";
// import "./../../assets/pages/css/themes/red.css";
import "./../../assets/corporate/css/custom.css";
import Logo from "./../../assets/corporate/img/logos/logo-shop-red.png";
import { Link } from "react-router-dom";
import { formatPrice } from "../../helpers";
const { Search } = Input;

export const Header = (props) => {
  const {
    loginInfo,
    isLogined,
    setDataSearch,
    countProduct,
    total,
    countCart,
    data,
  } = props;
  const [isOpenFormLogin, setIsOpenFormLogin] = useState(false);
  const [isOpenFormRegister, setIsOpenFormRegister] = useState(false);
  const countProductLocal = localStorage.getItem("COUNT_PRODUCT");

  const onSearch = (value) => {
    axios
      .get(
        `${URL_API}/Product/get-product?pageNum=1&pageSize=12&keyworks=${value}`
      )
      .then((res) => {
        setDataSearch(res.data.item);
      });
  };

  const openFormLogin = () => {
    setIsOpenFormLogin(true);
  };

  const openFormRegister = () => {
    setIsOpenFormRegister(true);
  };

  const handleCancelLogin = () => {
    setIsOpenFormLogin(false);
  };

  const handleCancelRegister = () => {
    setIsOpenFormRegister(false);
  };
  const logoutUser = () => {
    Cookies.remove(TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
    window.location.reload();
  };
  const menu = (
    <Menu
      items={[
        {
          label: (
            <a target="_blank" rel="noopener noreferrer">
              Tài khoản của tôi
            </a>
          ),
          key: "0",
        },
        {
          label: (
            <a target="_blank" rel="noopener noreferrer" onClick={logoutUser}>
              Đăng xuất
            </a>
          ),
          key: "2",
        },
      ]}
    />
  );

  const handleDeleteItem = (cartId) => {
    axios
      .delete(`${URL_API}/CartItem/delete-cart?cartId=${cartId}`)
      .then((res) => {
        window.location.reload();
      });
  };

  return (
    <div>
      <div className="header">
        <div className="container d-flex align-items-center">
          <Link to="/">
            <a className="site-logo">
              <img src={Logo} alt="Metronic Shop UI" />
            </a>
          </Link>
          <div className="w-50" style={{ paddingRight: 80 }}>
            <Search
              placeholder="Tìm kiếm"
              onSearch={onSearch}
              enterButton
            />
          </div>

          <div
            className="top-cart-block ms-auto pb-5 me-4"
            style={{ height: "auto" }}
          >
            <div className="top-cart-info">
              <a href="javascript:void(0);" className="top-cart-info-count">
                {countCart || 0} sản phẩm
              </a>
              <a href="javascript:void(0);" className="top-cart-info-value">
               {total ? formatPrice(total) : 0}
              </a>
            </div>
            <i className="fa fa-shopping-cart" />
            <div
              className="top-cart-content-wrapper"
              style={{ height: "auto" }}
            >
              <div className="top-cart-content">
                <ul className="scroller">
                  {data?.map((x) => (
                    <li className="w-100 d-flex">
                      <span className="cart-content-count">x {x.quantity}</span>
                      <strong>
                        <a>{x.productName}</a>
                      </strong>
                      <strong>{formatPrice(x.price)}</strong>
                      <a
                        className="del-goods"
                        onClick={() => handleDeleteItem(x.key)}
                      >
                        &nbsp;
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="text-right">
                  <Link to="/cart" className="cart">
                    <a className="btn btn-default">Xem gio hang</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="top-cart-block text-center pb-5">
            <div className="top-cart-info">
              {!isLogined ? (
                <>
                  <a onClick={openFormLogin} className="top-cart-info-count">
                    Đăng nhập
                  </a>
                  <a onClick={openFormRegister} className="top-cart-info-value">
                    Đăng ký
                  </a>
                </>
              ) : (
                <Dropdown overlay={menu}>
                  <Space style={{ fontWeight: "bold", paddingTop: 2 }}>
                    {loginInfo?.username}
                    <DownOutlined />
                  </Space>
                </Dropdown>
              )}
            </div>
          </div>
        </div>
      </div>
      <Link to="/cart" className="cart">
        <div className="login-logout">
          <Badge count={countProduct || countProductLocal}>
            <ShoppingCartOutlined className="login-logout-icon" />
          </Badge>
          <div class="about__box-content">Giỏ hàng</div>
        </div>
      </Link>
      <Modal
        title="Đăng nhập"
        open={isOpenFormLogin}
        onCancel={handleCancelLogin}
        footer={null}
      >
        <FormLogin setIsOpenFormLogin={setIsOpenFormLogin} />
      </Modal>
      <Modal
        title="Đăng ký"
        open={isOpenFormRegister}
        onCancel={handleCancelRegister}
        footer={null}
      >
        <FormRegister setIsOpenFormRegister={setIsOpenFormRegister} />
      </Modal>
    </div>
  );
};
