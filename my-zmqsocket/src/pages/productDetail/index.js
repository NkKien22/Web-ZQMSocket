import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Button, notification, Select } from "antd";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { formatPrice, URL_API } from "../../utils/common";
import { useParams } from "react-router-dom";
import { isNumber } from "lodash";

export const ProductDetail = (props) => {
  const { userId, countProduct, setCountProduct } = props;
  let { productID } = useParams();
  const [data, setData] = useState();
  const [colorOption, setColorOption] = useState([]);
  const [colorSelected, setColorSelected] = useState();
  const [capaCitySelected, setCapaCitySelected] = useState();
  const [capaCityOption, setCapaCityOption] = useState([]);
  const [optionAddToCart, setOptionAddToCart] = useState([]);

  const [images, setImages] = useState([
    {
      original:
        "http://dienthoai5.giaodienwebmau.com/wp-content/uploads/2021/11/iphone_13-_pro-3_2-510x510.jpg",
      thumbnail:
        "http://dienthoai5.giaodienwebmau.com/wp-content/uploads/2021/11/iphone_13-_pro-3_2-510x510.jpg",
    },
    {
      original:
        "http://dienthoai5.giaodienwebmau.com/wp-content/uploads/2021/11/iphone_13-_pro-4_2.jpg",
      thumbnail:
        "http://dienthoai5.giaodienwebmau.com/wp-content/uploads/2021/11/iphone_13-_pro-4_2.jpg",
    },
    {
      original:
        "http://dienthoai5.giaodienwebmau.com/wp-content/uploads/2021/11/iphone-13-pro-max-8_1.jpg",
      thumbnail:
        "http://dienthoai5.giaodienwebmau.com/wp-content/uploads/2021/11/iphone-13-pro-max-8_1.jpg",
    },
  ]);

  const getProduct = () => {
    axios
      .get(`${URL_API}/Product/get-product-detail-by-id?id=${productID}`)
      .then((res) => {
        setData(res.data.item);
        const colors = res.data.item.options.filter(
          (x) => x.optionNameID === 1
        );
        setColorOption(colors);
        setColorSelected(colors.map((x) => ({
          value: x.optionValueID,
          label: x.optionValue,
        }))[0]);
        const capaCities = res.data.item.options.filter(
          (x) => x.optionNameID === 2
        );
        setCapaCityOption(capaCities);
        setCapaCitySelected(capaCities.map((x) => ({
          value: x.optionValueID,
          label: x.optionValue,
        }))[0]);
      });
  };

  const addToCart = () => {
    const payload = {
      variantId: productID,
      userId: userId,
      options: optionAddToCart.map((x) => ({
        optionNameID: x.optionNameID,
        optionValueID: x.optionValueID
      }))
    };
    if (!userId) {
      notification.warning({
        message: "Bạn phải đăng nhập để thêm sản phẩm vào giỏ hàng",
      });
      return;
    }
    axios
      .post(`${URL_API}/CartItem/cart-item`, payload)
      .then((res) => {
        if (res) {
          setCountProduct(countProduct + 1);
          notification.success({
            message: "Them vào giỏ hàng thành công",
          });
        }
      })
      .then(() => {
        window.location.reload();
      });
  };

  useEffect(() => {
    if (colorSelected && capaCitySelected) {
      const data = [];
      data.push(colorOption.find((x) => x.optionValueID === colorSelected.value));
      data.push(capaCityOption.find((x) => x.optionValueID === capaCitySelected.value));
      setOptionAddToCart(data);
    }
  }, [colorSelected, capaCitySelected]);

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    if (isNumber(countProduct)) {
      setCountProduct(localStorage.setItem("COUNT_PRODUCT", countProduct));
    }
  }, [countProduct]);

  const handleChange = (value) => {
    setColorSelected(colorOption.find((x) => x.value === value));
  };

  const handleChangeCapacity = (value) => {
    setCapaCitySelected(capaCityOption.find((x) => x.value === value));
  };

  return (
    <div className="container mt-5">
      <Row>
        <Col sm={5}>
          <ReactImageGallery items={images} />
        </Col>
        <Col sm={7} className="float-start">
          <div className="ms-5">
            <h4 className="fw-bold float-start w-100">{data?.productName}</h4>
          </div>
          <div className="ms-5">
            <h4 className="fw-bold float-start text-danger w-100">
              {formatPrice(data?.price)}
            </h4>
          </div>
          <div className="ms-5">
            Màu:{" "}
            <Select
              style={{
                width: 120,
              }}
              value={colorSelected}
              onChange={handleChange}
              options={colorOption.map((x) => ({
                value: x.optionValueID,
                label: x.optionValue,
              }))}
            />
          </div>
          <div className="ms-5 mt-2">
            RAM:{" "}
            <Select
              style={{
                width: 120,
              }}
              value={capaCitySelected}
              onChange={handleChangeCapacity}
              options={capaCityOption.map((x) => ({
                value: x.optionValueID,
                label: x.optionValue,
              }))}
            />
          </div>
          <div className="ms-5 mt-2">
            <Button size="large" type="primary" onClick={addToCart} disabled={!data?.isProductVariantEnabled}>
              Thêm vào giỏ hàng
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};
