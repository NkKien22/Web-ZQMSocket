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

  const getAllProduct = (page, pageSize) => {
    setLoading(true);
    axios
      .get(`${URL_API}/Product/get-product?pageNum=${page}&pageSize=${pageSize}`)
      .then((res) => {
        setData(res.data.item);
        setTotal(parseInt(res.data.message.split(' ')[0]));
      })
      .finally(() => setLoading(false));
  };

  const onChangePage = (page, pageSize) => {
    setCurrentPage(page);
    getAllProduct(page, 12);
  };

  useEffect(() => {
    getAllProduct(1, 12);
  }, []);
  return (
    <div className="container mt-5">
      <Row>
        <Col style={{ fontWeight: "bold" }}>ĐIỆN THOẠI NỔI BẬT NHẤT</Col>
        <Col className="ms-auto">
          <Button>Apple</Button>
          <Button style={{ marginLeft: 10 }}>Asus</Button>
          <Button style={{ marginLeft: 10 }}>Nokia</Button>
          <Button style={{ marginLeft: 10 }}>Oppo</Button>
        </Col>
      </Row>
      <Row className="mt-5" justify="space-evenly" xs={1} md={4} lg={6}>
        {loading ? (
          <Spin className="text-center" />
        ) : (
          <>
            {(dataSearch || data).map((x) => {
              return (
                <Col>
                  <Link to={`/product/${x.variantID}`}>
                    <Card
                      hoverable
                      style={{ width: 200 }}
                      cover={
                        <img
                          alt="example"
                          src="https://cf.shopee.vn/file/2c4d98eeff0be7f6eaeb25f919e13c44"
                          style={{ height: 200 }}
                        />
                      }
                    >
                      <b>{x.productName}</b>
                      <p style={{ color: "red", fontWeight: "bold" }}>
                        {formatPrice(x.price)}
                      </p>
                    </Card>
                  </Link>
                </Col>
              );
            })}
          </>
        )}
      </Row>
      {(dataSearch?.length > 0 || data.length > 0) && <Pagination current={currentPage} onChange={onChangePage} total={total} pageSize={12} />}
    </div>
  );
};
