import { Col, Row, Card, Button, Rate } from 'antd';
import Product1 from './../../images/product1.jpg';
import Product2 from './../../images/iphone14.png';

export const ProductList = () => {
  return (
    <div style={{marginTop: 150}}>
      <Row>
        <Col className="gutter-row" span={8} style={{fontWeight: 'bold'}}>ĐIỆN THOẠI NỔI BẬT NHẤT</Col>
        <Col className="gutter-row" span={8} offset={7} style={{float: 'right'}}>
          <Button>Apple</Button>
          <Button style={{marginLeft: 10}}>Asus</Button>
          <Button style={{marginLeft: 10}}>Nokia</Button>
          <Button style={{marginLeft: 10}}>Oppo</Button>
        </Col>
      </Row>
      <Row style={{marginTop: 20}}>
        <Col className="gutter-row" span={4} offset={2}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={Product1} style={{ height: 250 }} />}
          >
            <b>iPhone 13 Pro Max | Chính hãng VN/A</b>
            <p style={{color: 'red', fontWeight: 'bold'}}>24.500.000 VND</p>
            <Rate defaultValue={2.5} />
          </Card>
        </Col>
        <Col className="gutter-row" span={4}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src="https://cdn2.cellphones.com.vn/358x/media/catalog/product/_/e/_en-iphone-14-pro.png" style={{ height: 250 }} />}
          >
            <b>iPhone 13 Pro Max | Chính hãng VN/A</b>
            <p style={{color: 'red', fontWeight: 'bold'}}>24.500.000 VND</p>
            <Rate defaultValue={2.5} />
          </Card>
        </Col>
        <Col className="gutter-row" span={4}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src="https://cdn-dgcei.nitrocdn.com/QaFavQVnaqgHtiSsAelwGDKVguOuACXM/assets/static/optimized/rev-8d33813/wp-content/uploads/2022/09/iPhone14pro-ShopDunk-Silver.png" style={{ height: 250 }} />}
          >
            <b>iPhone 13 Pro Max | Chính hãng VN/A</b>
            <p style={{color: 'red', fontWeight: 'bold'}}>24.500.000 VND</p>
            <Rate defaultValue={2.5} />
          </Card>
        </Col>
        <Col className="gutter-row" span={4}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={Product1} style={{ height: 250 }} />}
          >
            <b>iPhone 13 Pro Max | Chính hãng VN/A</b>
            <p style={{color: 'red', fontWeight: 'bold'}}>24.500.000 VND</p>
            <Rate defaultValue={2.5} />
          </Card>
        </Col>
        <Col className="gutter-row" span={4}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={Product1} style={{ height: 250 }} />}
          >
            <b>iPhone 13 Pro Max | Chính hãng VN/A</b>
            <p style={{color: 'red', fontWeight: 'bold'}}>24.500.000 VND</p>
            <Rate defaultValue={2.5} />
          </Card>
        </Col>
      </Row>
      <Row style={{marginTop: 20}}>
        <Col className="gutter-row" span={4} offset={2}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={Product1} style={{ height: 250 }} />}
          >
            <b>iPhone 13 Pro Max | Chính hãng VN/A</b>
            <p style={{color: 'red', fontWeight: 'bold'}}>24.500.000 VND</p>
            <Rate defaultValue={2.5} />
          </Card>
        </Col>
        <Col className="gutter-row" span={4}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={Product1} style={{ height: 250 }} />}
          >
            <b>iPhone 13 Pro Max | Chính hãng VN/A</b>
            <p style={{color: 'red', fontWeight: 'bold'}}>24.500.000 VND</p>
            <Rate defaultValue={2.5} />
          </Card>
        </Col>
        <Col className="gutter-row" span={4}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={Product1} style={{ height: 250 }} />}
          >
            <b>iPhone 13 Pro Max | Chính hãng VN/A</b>
            <p style={{color: 'red', fontWeight: 'bold'}}>24.500.000 VND</p>
            <Rate defaultValue={2.5} />
          </Card>
        </Col>
        <Col className="gutter-row" span={4}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={Product1} style={{ height: 250 }} />}
          >
            <b>iPhone 13 Pro Max | Chính hãng VN/A</b>
            <p style={{color: 'red', fontWeight: 'bold'}}>24.500.000 VND</p>
            <Rate defaultValue={2.5} />
          </Card>
        </Col>
        <Col className="gutter-row" span={4}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={Product1} style={{ height: 250 }} />}
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