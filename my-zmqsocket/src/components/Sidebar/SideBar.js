import { Menu } from "antd";

export const SideBar = (props) => {
  const { isActive } = props;
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
    getItem("Quản lý sản phẩm", "1"),
    getItem("Quản lý khách hàng", "2"),
  ];
  const onChangeUrl = (data) => {
    if(data.key === '1') {
      window.location.replace('/qlsanpham');
    }
    if(data.key === '2') {
      window.location.replace('/qltaikhoan');
    }
  }
  return (
    <div className="col-sm-2">
      <Menu
        onClick={onChangeUrl}
        style={{ width: 256 }}
        defaultSelectedKeys={[isActive]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
    </div>
  );
};
