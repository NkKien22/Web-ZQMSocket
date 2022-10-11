import { Row, Col, Card, Button, Rate, Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatPrice } from "../../helpers";
import { URL_API } from "../../utils/common";
import { Pagination } from "antd";

export const ProductList = (props) => {
  const {dataSearch } = props;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState([]);


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

  const getAllCategory = () => {
    axios
    .get(`${URL_API}/Product/get-category`)
    .then((res) => {
      setCategory(res.data.item);
    })
  }

  useEffect(() => {
    getAllProduct(1, 12);
    getAllCategory();
  }, []);
  return (
    <div className="container mt-5">
      <Row>
        <Col style={{ fontWeight: "bold" }}>ĐIỆN THOẠI NỔI BẬT NHẤT</Col>
        <Col className="ms-auto">
          {category.map((x) => {
            return (
              <Button style={{ marginLeft: 10 }}>{x.tacagoryName}</Button>
            )
          })}
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
                    // cover={<img alt="example" src={`${PATH_IMG}/${x.images[0].split('\\').pop()}`} style={{ height: 200 }} />}
                  >
                    <b>{x.productName}</b>
                    <p style={{ color: "red", fontWeight: "bold" }}>
                      {formatPrice(x.price)}
                    </p>
                    {/* <Rate defaultValue={2.5} /> */}
                  </Card>
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
