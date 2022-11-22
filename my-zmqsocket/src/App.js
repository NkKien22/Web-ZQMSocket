import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductDetail } from "./pages/productDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./components/home";
import { Header } from "./components/header";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { TOKEN_KEY, URL_API } from "./utils/common";
import { Cart } from "./pages/cart";
import axios from "axios";

function App() {
  const [loginInfo, setLoginInfo] = useState();
  const [isLogined, setIsLogined] = useState();
  const [countProduct, setCountProduct] = useState(0);
  const [data, setData] = useState();
  const [total, setTotal] = useState();
  const [countCart, setCountCart] = useState();

  useEffect(() => {
    const tokenLogin = Cookies.get(TOKEN_KEY);
    if (!tokenLogin) {
      setIsLogined(false);
    } else {
      const parseToken = jwt_decode(tokenLogin);
      setLoginInfo(parseToken);
      setIsLogined(true);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("COUNT_PRODUCT") !== undefined) {
      setCountProduct(localStorage.getItem("COUNT_PRODUCT"));
    } else {
      setCountProduct(0);
    }
  }, [localStorage.getItem("COUNT_PRODUCT")]);

  const getCarts = () => {
    axios
      .get(`${URL_API}/CartItem/getbyid-cartItem?userId=${loginInfo?.id}`)
      .then((res) => {
        setCountCart(res?.data?.item?.length);
        setTotal(res?.data?.message);
        setData(
          res?.data?.item.map((x) => ({
            key: x?.cartId,
            productName: x?.productName,
            quantity: x?.quantity,
            price: x?.price,
            total: x?.total,
          }))
        );
      });
  };

  useEffect(() => {
    if (loginInfo) getCarts();
  }, [loginInfo]);

  return (
    <BrowserRouter>
      <div>
        <Header
          loginInfo={loginInfo}
          isLogined={isLogined}
          countProduct={countProduct}
          userId={loginInfo?.id}
          total={total}
          countCart={countCart}
          data={data}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/product/:productID"
            element={
              <ProductDetail
                userId={loginInfo?.id}
                setCountProduct={setCountProduct}
                countProduct={countProduct}
              />
            }
          />
          <Route path="/cart" element={<Cart userId={loginInfo?.id} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
