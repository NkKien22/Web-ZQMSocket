import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Header } from './components/header';
import { ProductDetail } from './pages/productDetail';
import { Banner } from './components/banner';
import { ProductList } from './components/productList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import { TOKEN_KEY } from './utils/common';

function App() {
  const [loginInfo, setLoginInfo] = useState();
  const [isLogined, setIsLogined] = useState();
  const [dataSearch, setDataSearch] = useState(null);

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
  return (
    <div className="App">
      <Header loginInfo={loginInfo} isLogined={isLogined} setDataSearch={setDataSearch} />
      <Banner />
      <ProductList dataSearch={dataSearch} />
      <BrowserRouter>
        <Routes>
          <Route path="/product/:1" element={<ProductDetail />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
