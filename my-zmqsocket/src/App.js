import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Header } from './components/header';
import { ProductDetail } from './pages/productDetail';

function App() {
  return (
    <div className="App">
      <Header />
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
