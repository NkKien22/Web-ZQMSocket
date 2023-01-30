import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Button, notification, Select, Tag, Spin } from "antd";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { formatPrice, URL_API , CART_ID} from "../../utils/common";
import { useParams } from "react-router-dom";
import { isNumber } from "lodash";


export const ProductDetail = (props) => {
  const { userId, countProduct, setCountProduct } = props;
  let { productId, id } = useParams();
  const [data, setData] = useState();
  const [capaCitySelected, setCapaCitySelected] = useState();
  const [capaCityOption, setCapaCityOption] = useState([]);
  const [optionAddToCart, setOptionAddToCart] = useState([]);
  const [cartId, setCartId] = useState();
  const [images, setImages] = useState();

  useEffect(() => {
    let cartId = localStorage.getItem(CART_ID);
    setCartId(cartId)
    getProduct();
  }, []);

  useEffect(() => {
    if (isNumber(countProduct)) {
      setCountProduct(localStorage.setItem("COUNT_PRODUCT", countProduct));
    }
  }, [countProduct]);

  const getProduct = () => {
    axios.get(`${URL_API}/Product/${productId}/detail-id/${id}`).then((res) => {
      setData(res.data);
      setImages(res.data.productVariants[0].images);
    });
  };

  const addToCart = () => {
    const payload = {
      items: [
        {
          productVariantId: id,
          quatity: 1
        }
      ],
      id: cartId
    };
    if (!userId) {
      notification.warning({
        message: "Bạn phải đăng nhập để thêm sản phẩm vào giỏ hàng",
      });
      return;
    }
    axios
      .put(`${URL_API}/Cart/add-item-to-cart`, payload)
      .then((res) => {
        if (res) {
          setCountProduct(countProduct + 1);
          notification.success({
            message: "Thêm vào giỏ hàng thành công",
          });
          setCountProduct(localStorage.setItem("COUNT_PRODUCT", res?.data?.items?.length));
        }
      })
      .then(() => {
        window.location.reload();
      });
  };

  return data === undefined?  (
    <Spin className="text-center" />
  ) : (
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
              {formatPrice(data?.productVariants[0]?.price)}
            </h4>
          </div>
          {data?.productVariants[0].optionValues.map((el, index) => (
            <div className="ms-5 mt-2">
              <Tag>{el.option}</Tag> : <b>{el.value}</b>
            </div>
          ))}
          <div className="ms-5 mt-2">
            <Button
              size="large"
              type="primary"
              onClick={addToCart}
              disabled={data?.productVariants[0]?.isProductVariantEnabled || data?.productVariants[0]?.quatity <= 0}
            >
              Thêm vào giỏ hàng
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};
