import { Row, Col, Card, Button, Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatPrice } from "../../helpers";
import { URL_API } from "../../utils/common";
import { Pagination } from "antd";
import { Link } from "react-router-dom";

export const ProductList = (props) => {
  const { dataSearch } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [dataCategory, setDataCategory] = useState([]);

  const getAllProduct = (page, pageSize) => {
    setLoading(true);
    axios
      .get(
        `${URL_API}/Product/get-product?pageNum=${page}&pageSize=${pageSize}`
      )
      .then((res) => {
        setData(res.data.item);
        setTotal(parseInt(res.data.message.split(" ")[0]));
      })
      .finally(() => setLoading(false));
  };

  const getProductByCategory = (page, pageSize, tacagoryName) => {
    setLoading(true);
    axios
      .get(
        `${URL_API}/Product/get-product?pageNum=${page}&pageSize=${pageSize}&keyworks=${tacagoryName}`
      )
      .then((res) => {
        setData(res.data.item);
        setTotal(parseInt(res.data.message.split(" ")[0]));
      })
      .finally(() => setLoading(false));
  };

  const onChangePage = (page, pageSize) => {
    setCurrentPage(page);
    getAllProduct(page, 12);
  };
  // https://localhost:7018/api/Product/get-category

  const getAllCategory = () => {
    axios.get(`${URL_API}/Product/get-category`).then((res) => {
      setDataCategory(res.data.item);
    });
  };

  useEffect(() => {
    getAllProduct(1, 12);
    getAllCategory();
  }, []);

  const onFilterByCategory = (tacagoryName) => {
    getProductByCategory(1, 12, tacagoryName);
  }

  return (
    <div className="container mt-5">
      <Row>
        <Col style={{ fontWeight: "bold" }}>ĐIỆN THOẠI NỔI BẬT NHẤT</Col>
        <Col className="ms-auto">
          {dataCategory.map((x) => (
            <Button style={{ marginLeft: 10 }} onClick={() => onFilterByCategory(x.tacagoryName)}>{x.tacagoryName}</Button>
          ))}
        </Col>
      </Row>
      <Row className="mt-5" justify="space-evenly" xs={1} sm={6} md={6} lg={6}>
        {loading ? (
          <Spin className="text-center" />
        ) : (
          <>
            {(dataSearch || data).map((x) => {
              return (
                <Col>
                  <Link to={`/product/${x.productID}`}>
                    <Card
                      hoverable
                      style={{ width: 250 }}
                      cover={
                        <img
                          alt="example"
                          src="https://cf.shopee.vn/file/2c4d98eeff0be7f6eaeb25f919e13c44"
                          style={{ height: 200 }}
                        />
                      }
                    >
                      <div className="text-center fw-bold">{x.productName}</div>
                      <div className="d-flex">
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          {formatPrice(x.price)}
                        </span>
                        <span
                          style={{ color: "red", fontWeight: "bold" }}
                          className="text-decoration-line-through ms-5"
                        >
                          {formatPrice(x.fakePrice)}
                        </span>
                      </div>
                    </Card>
                  </Link>
                </Col>
              );
            })}
          </>
        )}
      </Row>
      {(dataSearch?.length > 0 || data.length > 0) && (
        <Pagination
          current={currentPage}
          onChange={onChangePage}
          total={total}
          pageSize={12}
        />
      )}
    </div>
  );
};
