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

function App() {
  return (
    <div className="App">
      <Header />
      <Banner />
      <ProductList />
      <BrowserRouter>
        <Routes>
          <Route path="/detail" element={<ProductDetail />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
