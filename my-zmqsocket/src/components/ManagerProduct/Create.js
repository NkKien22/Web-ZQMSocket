import { Numbers } from "@mui/icons-material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const ProductCreate = () => {
  const [ProductID, ProductIDCh] = useState("");
  const [Images, ImagesCh] = useState("");
  const [ProductName, ProductNameCh] = useState("");
  const [BrandName, BrandNameCh] = useState("");
  const [ImportPrice, ImportPriceCh] = useState("");
  const [Price, PriceCh] = useState("");
  const [Quantity, QuantityCh] = useState("");
  const [validation, valchange] = useState(false);
  const navigate = useNavigate();
  const handlesubmit = (e) => {
    e.preventDefault();
    const Product = {
      ProductName,
      BrandName,
      ImportPrice,
      Price,
      Quantity,
      Images,
    };
    fetch("http://localhost:8000/employee", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Product),
    })
      .then((res) => {
        alert("Saved successfully.");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div class="container-fluid">
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2>Thêm sản phẩm</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Ảnh sản phẩm</label>
                      <input
                        required
                        value={Images}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => ImagesCh(e.target.value)}
                        className="form-control"
                      ></input>
                      {Images.length == 0 && validation && (
                        <span className="text-danger">Chưa nhập link ảnh</span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Tên sản phẩm</label>
                      <input
                        required
                        value={ProductName}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => ProductNameCh(e.target.value)}
                        className="form-control"
                      ></input>
                      {ProductName.length == 0 && validation && (
                        <span className="text-danger">Chưa nhập tên</span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Tên thương hiệu</label>
                      <input
                        required
                        value={BrandName}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => BrandNameCh(e.target.value)}
                        className="form-control"
                      ></input>
                      {BrandName.length == 0 && validation && (
                        <span className="text-danger">
                          Chưa nhập tên thương hiệu
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Giá nhập khẩu</label>
                      <input
                        type={"number"}
                        required
                        value={ImportPrice}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => ImportPriceCh(e.target.value)}
                        className="form-control"
                      ></input>
                      {ImportPrice.length == 0 && validation && (
                        <span className="text-danger">Chưa nhập giá nhập</span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Giá Bán</label>
                      <input
                        type={"number"}
                        required
                        value={Price}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => PriceCh(e.target.value)}
                        className="form-control"
                      ></input>
                      {Price.length == 0 && validation && (
                        <span className="text-danger">Chưa nhập giá bán</span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Số lượng</label>
                      <input
                        type={"number"}
                        required
                        value={Quantity}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => QuantityCh(e.target.value)}
                        className="form-control"
                      ></input>
                      {Quantity.length == 0 && validation && (
                        <span className="text-danger">Chưa nhập số lượng</span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">
                        Lưu
                      </button>
                      <Link to="/QLSanPham" className="btn btn-danger">
                        Quay lại
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
