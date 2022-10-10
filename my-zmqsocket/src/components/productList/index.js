import { Row, Col, Card, Button, Rate } from 'antd';
import Product1 from './../../images/product1.jpg';

export const ProductList = () => {
  return (
    <div className="container mt-5">
      <Row>
        <Col style={{fontWeight: 'bold'}}>ĐIỆN THOẠI NỔI BẬT NHẤT</Col>
        <Col className="ms-auto">
          <Button>Apple</Button>
          <Button style={{marginLeft: 10}}>Asus</Button>
          <Button style={{marginLeft: 10}}>Nokia</Button>
          <Button style={{marginLeft: 10}}>Oppo</Button>
        </Col>
      </Row>
      <Row className="mt-5" justify="space-evenly" xs={1} md={4} lg={6}>
        <Col>
          <Card
            hoverable
            style={{ width: 200 }}
            cover={<img alt="example" src={Product1} style={{ height: 200 }} />}
          >
            <b>iPhone 13 Pro Max | Chính hãng VN/A</b>
            <p style={{color: 'red', fontWeight: 'bold'}}>24.500.000 VND</p>
            <Rate defaultValue={2.5} />
          </Card>
        </Col>
        <Col>
          <Card
            hoverable
            style={{ width: 200 }}
            cover={<img alt="example" src="https://cdn2.cellphones.com.vn/358x/media/catalog/product/_/e/_en-iphone-14-pro.png" style={{ height: 200 }} />}
          >
            <b>iPhone 13 Pro Max | Chính hãng VN/A</b>
            <p style={{color: 'red', fontWeight: 'bold'}}>24.500.000 VND</p>
            <Rate defaultValue={2.5} />
          </Card>
        </Col>
        <Col>
          <Card
            hoverable
            style={{ width: 200 }}
            cover={<img alt="example" src="https://cdn-dgcei.nitrocdn.com/QaFavQVnaqgHtiSsAelwGDKVguOuACXM/assets/static/optimized/rev-8d33813/wp-content/uploads/2022/09/iPhone14pro-ShopDunk-Silver.png" style={{ height: 200 }} />}
          >
            <b>iPhone 13 Pro Max | Chính hãng VN/A</b>
            <p style={{color: 'red', fontWeight: 'bold'}}>24.500.000 VND</p>
            <Rate defaultValue={2.5} />
          </Card>
        </Col>
        <Col>
          <Card
            hoverable
            style={{ width: 200 }}
            cover={<img alt="example" src={Product1} style={{ height: 200 }} />}
          >
            <b>iPhone 13 Pro Max | Chính hãng VN/A</b>
            <p style={{color: 'red', fontWeight: 'bold'}}>24.500.000 VND</p>
            <Rate defaultValue={2.5} />
          </Card>
        </Col>
        <Col>
          <Card
            hoverable
            style={{ width: 200 }}
            cover={<img alt="example" src={Product1} style={{ height: 200 }} />}
          >
            <b>iPhone 13 Pro Max | Chính hãng VN/A</b>
            <p style={{color: 'red', fontWeight: 'bold'}}>24.500.000 VND</p>
            <Rate defaultValue={2.5} />
          </Card>
        </Col>
        <Col>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={Product1} style={{ height: 200 }} />}
          >
            <b>iPhone 13 Pro Max | Chính hãng VN/A</b>
            <p style={{color: 'red', fontWeight: 'bold'}}>24.500.000 VND</p>
            <Rate defaultValue={2.5} />
          </Card>
        </Col>
      </Row>
      <Row className="mt-2" justify="space-evenly" xs={1} md={4} lg={6}>
        <Col>
          <Card
            hoverable
            style={{ width: 200 }}
            cover={<img alt="example" src={Product1} style={{ height: 200 }} />}  
          >
            <b>iPhone 13 Pro Max | Chính hãng VN/A</b>
            <p style={{color: 'red', fontWeight: 'bold'}}>24.500.000 VND</p>
            <Rate defaultValue={2.5} />
          </Card>
        </Col>
        <Col>
          <Card
            hoverable
            style={{ width: 200 }}
            cover={<img alt="example" src="https://cdn2.cellphones.com.vn/358x/media/catalog/product/_/e/_en-iphone-14-pro.png" style={{ height: 200 }} />}
          >
            <b>iPhone 13 Pro Max | Chính hãng VN/A</b>
            <p style={{color: 'red', fontWeight: 'bold'}}>24.500.000 VND</p>
            <Rate defaultValue={2.5} />
          </Card>
        </Col>
        <Col>
          <Card
            hoverable
            style={{ width: 200 }}
            cover={<img alt="example" src="https://cdn-dgcei.nitrocdn.com/QaFavQVnaqgHtiSsAelwGDKVguOuACXM/assets/static/optimized/rev-8d33813/wp-content/uploads/2022/09/iPhone14pro-ShopDunk-Silver.png" style={{ height: 200 }} />}
          >
            <b>iPhone 13 Pro Max | Chính hãng VN/A</b>
            <p style={{color: 'red', fontWeight: 'bold'}}>24.500.000 VND</p>
            <Rate defaultValue={2.5} />
          </Card>
        </Col>
        <Col>
          <Card
            hoverable
            style={{ width: 200 }}
            cover={<img alt="example" src={Product1} style={{ height: 200 }} />}
          >
            <b>iPhone 13 Pro Max | Chính hãng VN/A</b>
            <p style={{color: 'red', fontWeight: 'bold'}}>24.500.000 VND</p>
            <Rate defaultValue={2.5} />
          </Card>
        </Col>
        <Col>
          <Card
            hoverable
            style={{ width: 200 }}
            cover={<img alt="example" src={Product1} style={{ height: 200 }} />}
          >
            <b>iPhone 13 Pro Max | Chính hãng VN/A</b>
            <p style={{color: 'red', fontWeight: 'bold'}}>24.500.000 VND</p>
            <Rate defaultValue={2.5} />
          </Card>
        </Col>
        <Col>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={Product1} style={{ height: 200 }} />}
          >
            <b>iPhone 13 Pro Max | Chính hãng VN/A</b>
            <p style={{color: 'red', fontWeight: 'bold'}}>24.500.000 VND</p>
            <Rate defaultValue={2.5} />
          </Card>
        </Col>
      </Row>
    </div>
  )
} 