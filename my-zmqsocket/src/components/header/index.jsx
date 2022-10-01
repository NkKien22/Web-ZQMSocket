import { Dropdown, Modal , Input, Space, Menu } from 'antd';
import { PhoneOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import "./styles.css";
import { useState } from 'react';
import { FormLogin } from './formLogin';
import { FormRegister } from './formRegister';
const { Search } = Input;

export const Header = () => {
  const [isOpenFormLogin, setIsOpenFormLogin] = useState(false);
  const [isOpenFormRegister, setIsOpenFormRegister] = useState(false);
  const [alreadyLogin, setAlreadyLogin] = useState(true);

  const onSearch = (value) => console.log(value);

  const openFormLogin = () => {
    setIsOpenFormLogin(true);
  }

  const openFormRegister = () => {
    setIsOpenFormRegister(true);
  }

  const handleCancelLogin = () => {
    setIsOpenFormLogin(false);
  };

  const handleCancelRegister = () => {
    setIsOpenFormRegister(false);
  };
  const logoutUser = () => {
    // xử lý đăng xuất tại đây
  }
  const menu = (
    <Menu
      items={[
        {
          label: (
            <a target="_blank" rel="noopener noreferrer">
              Tài khoản của tôi
            </a>
          ),
          key: '0',
        },
        {
          label: (
            <a target="_blank" rel="noopener noreferrer">
              Đơn mua
            </a>
          ),
          key: '1',
        },
        {
          label: (
            <a target="_blank" rel="noopener noreferrer" onClick={logoutUser}>
              Đăng xuất
            </a>
          ),
          key: '3',
        },
      ]}
    />
  );
  return (
    <div className='header'>
      <Search className='input-search' size='large' placeholder="Tìm kiếm..." onSearch={onSearch} style={{ width: 400, marginTop: 5 }} />
      <div className='call'>
        <PhoneOutlined className='phone-icon' />
        <div class="about__box-content"><p>Gọi mua hàng<br/><strong>0972495768</strong></p></div>
      </div>
      <div className='login-logout'>
        <UserOutlined className='login-logout-icon' />
        <div class="about__box-content">
          {alreadyLogin ? 
            <Dropdown overlay={menu}>
              <Space style={{color: '#fff', fontWeight: 'bold'}}>
                  Nguyễn Khắc Kiên
                <DownOutlined />
              </Space>     
            </Dropdown> :
            <>
              <strong onClick={openFormLogin} style={{cursor: 'pointer'}}>Đăng nhập</strong>/<strong style={{cursor: 'pointer'}} onClick={openFormRegister}>Đăng ký</strong>
            </>
          }
        </div>
      </div>
      <Modal title="Đăng nhập" open={isOpenFormLogin} onCancel={handleCancelLogin} footer={null}>
        <FormLogin />
      </Modal>
      <Modal title="Đăng ký" open={isOpenFormRegister} onCancel={handleCancelRegister} footer={null}>
        <FormRegister />
      </Modal>
    </div>
  )
}