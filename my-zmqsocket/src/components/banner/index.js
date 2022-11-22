import React from 'react';
import { AppstoreOutlined } from '@ant-design/icons';
import { Menu, Carousel, Row, Col  } from 'antd';
import Slider1 from './../../images/slider1.png';
import Slider2 from './../../images/slider2.png';
import Slider3 from './../../images/slider3.png';

export const Banner = () => {

  return (
    <div className="container">
      <Row>
        <Col span={24}>
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