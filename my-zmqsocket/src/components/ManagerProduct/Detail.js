import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const ProductDetail = () => {
    const { pid } = useParams();
    const [productdata, productdatachange] = useState({});
    return (
        <div class="container-fluid">
               <div className="container">
            <div className="card row" style={{ "textAlign": "left" }}>
                <div className="card-title">
                    <h2>Chi tiết sản phẩm</h2>
                </div>
                <div className="card-body"></div>
                {productdata &&
                    <div>
                        <img src={productdata.Images} width={200}></img>
                        <h5>Tên sản phẩm: {productdata.ProductName}</h5>
                        <h5>Tên thương hiệu: {productdata.BrandName}</h5>
                        <h5>Giá nhập khẩu: {productdata.ImportPrice}</h5>
                        <h5>Giá Bán: {productdata.Price}</h5>
                        <h5>Số lượng: {productdata.Quantity}</h5>
                        <Link className="btn btn-danger" to="/QLSanPham">Quay lại danh sách</Link>
                    </div>
                }
            </div>
            </div>
        </div >
    );
}

export default ProductDetail;