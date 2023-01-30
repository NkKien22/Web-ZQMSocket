import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductDetail } from "./pages/productDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./components/home";
import { Header } from "./components/header";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { TOKEN_KEY, URL_API, CART_ID } from "./utils/common";
import { Cart } from "./pages/cart";
import axios from "axios";
import ProductManager from "./components/ManagerProduct/Product";
import ClientManager from "./components/ManagerClient/ManagerClient";
import Profile from "./pages/Profile";
import { MyOrder } from "./pages/my-order";
import ManagerCoupon from "./components/ManagerCoupon/ManagerCoupon";
import ManagerInvoice from "./components/ManagerInvoice/ManagerInvoice";
import Promotion from "./components/Promotion/promotion";


function App() {
  const [cartId, setCartId] = useState();
  const [loginInfo, setLoginInfo] = useState();
  const [isLogined, setIsLogined] = useState();
  const [countProduct, setCountProduct] = useState(0);
  const [data, setData] = useState();
  const [total, setTotal] = useState();
  const [countCart, setCountCart] = useState();
  const [dataSearch, setDataSearch] = useState([]);
  useEffect(() => {
    let cartId = localStorage.getItem(CART_ID);
    setCartId(cartId)
    const tokenLogin = localStorage.getItem(TOKEN_KEY);
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
      .get(`${URL_API}/Cart/get-cart-by-id/${cartId}`)
      .then((res) => {
        localStorage.setItem("COUNT_PRODUCT", res?.data?.items?.length)
        setCountCart(res?.data?.items?.length);
        setTotal(res?.data?.message);
        setData(
          res?.data?.items.map((x) => ({
            key: x?.productVariants[0]?.id,
            productName: x?.productName,
            quantity: x?.productVariants[0]?.quantity,
            price: x?.productVariants[0]?.price,
            total:
              x?.productVariants[0]?.price * x?.productVariants[0]?.quantity,
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
          setDataSearch={setDataSearch}
        />
        <Routes>
          <Route path="/" element={<Home dataSearch={dataSearch} />} />
          <Route
            path="/product/:productId/detail-by/:id"
            element={
              <ProductDetail
                userId={loginInfo?.id}
                setCountProduct={setCountProduct}
                countProduct={countProduct}
              />
            }
          />
          <Route path="/cart" element={<Cart userId={loginInfo?.id} cartId={cartId} />} />
          <Route path="/my-order" element={<MyOrder userId={loginInfo?.id}/>} />
          <Route path="/QLSanPham" element={<ProductManager />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/qltaikhoan" element={<ClientManager />} />
          <Route path="/qlkhuyenmai" element={<ManagerCoupon />} />
          <Route path="/qlhoadon" element={<ManagerInvoice />} />
          <Route path="/promotion" element={<Promotion />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
