import React from 'react';
import { AppstoreOutlined } from '@ant-design/icons';
import { Menu, Carousel, Row, Col  } from 'antd';
import Slider1 from './../../images/slider1.png';
import Slider2 from './../../images/slider2.png';
import Slider3 from './../../images/slider3.png';

export const Banner = () => {
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const items = [
    getItem('Điện thoại', 'sub1', <AppstoreOutlined />, [
      getItem('Samsung 1', '1'),
      getItem('Samsung 6', '6'),
    ]),
    getItem('Laptop', 'sub2', <AppstoreOutlined />, [
      getItem('Option 5', '5'),
      getItem('Option 6', '6'),
    ]),
    getItem('Phụ kiện', 'sub3', <AppstoreOutlined />, [
      getItem('Option 5', '5'),
      getItem('Option 6', '6'),
    ]),
  ];

  const onClick = (e) => {
    console.log('click', e);
  };

  return (
    <div style={{height: 350}}>
      <Row>
        <Col span={3} offset={2}>
          <Menu
            onClick={onClick}
            style={{
              width: '100%',
            }}
            mode="vertical"
            items={items}
          />
        </Col>
        <Col span={17}>
          <Carousel>
            <div>
              <img style={{width: '100%'}} src={Slider1}/>
            </div>
            <div>
              <img style={{width: '100%'}} src={Slider2}/>
            </div>
            <div>
              <img style={{width: '100%'}} src={Slider3} />
            </div>
          </Carousel>
        </Col>
      </Row>
    </div>
  )
}