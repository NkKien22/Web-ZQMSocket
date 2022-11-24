import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal, Input } from "react-bootstrap";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
function ProductManager() {
  const [empdata, empdatachange] = useState(null);//Thêm link api get all user
  const navigate = useNavigate();
  const LoadDetail = (id) => {
    navigate("/QLSanPham/detail/" + id);
}
const LoadEdit = (id) => {
    navigate("/QLSanPham/edit/" + id);
}
const Removefunction = (id) => {
    if (window.confirm('Bạn có chắn chắn muốn xóa tài khoản này?')) {
        fetch("http://localhost:8000/employee/" + id, {
            method: "DELETE"
        }).then((res) => {
            alert('Removed successfully.')
            window.location.reload();
        }).catch((err) => {
            console.log(err.message)
        })
    }
}
useEffect(() => {
    fetch("http://localhost:8000/employee").then((res) => {
        return res.json();
    }).then((resp) => {
        empdatachange(resp);
    }).catch((err) => {
        console.log(err.message);
    })
}, [])
const Product =[{
  'anh':'https://kynguyenlamdep.com/wp-content/uploads/2022/06/co-nang-nhi-nhanh-700x700.jpg',
  'tn':'Tên SP1',
  'th':'Thương hiệu',
  'gianhap':20000000,
  'giaban':21000000,
  'sl':10
},
{
  'anh':'https://toigingiuvedep.vn/wp-content/uploads/2021/06/hinh-anh-gai-xinh-de-thuong-nhat-1.jpg',
  'tn':'Tên SP2',
  'th':'Thương hiệu',
  'gianhap':20000000,
  'giaban':21000000,
  'sl':10
},
{
  'anh':'https://2.bp.blogspot.com/-fjf5yU5r1Jk/WE1VD1BBKpI/AAAAAAAAjgI/bXwGoigAPJYvScMPtzJtzbOJfoGQO2C_ACEw/s1600/15349541_533868826819201_3350340522319981193_n.jpg',
  'tn':'Tên SP3',
  'th':'Thương hiệu',
  'gianhap':20000000,
  'giaban':21000000,
  'sl':10
},
{
  'anh':'https://luv.vn/wp-content/uploads/2021/08/hinh-anh-gai-xinh-43-edited.jpg',
  'tn':'Tên SP4',
  'th':'Thương hiệu',
  'gianhap':20000000,
  'giaban':21000000,
  'sl':10
},
{
  'anh':'https://tip.edu.vn/wp-content/uploads/2022/08/Hinh-Girl-Xinh-De-Thuong-Dep-Nhat.jpg',
  'tn':'Tên SP5',
  'th':'Thương hiệu',
  'gianhap':20000000,
  'giaban':21000000,
  'sl':10
},
{
  'anh':'https://bigdata-vn.com/wp-content/uploads/2021/10/Hinh-anh-gai-xinh-deo-kinh-dang-yeu-AUTO-cute.jpg',
  'tn':'Tên SP6',
  'th':'Thương hiệu',
  'gianhap':20000000,
  'giaban':21000000,
  'sl':10
},
{
  'anh':'https://tokyometro.vn/wp-content/uploads/2022/09/1663776782_775_200-Anh-gai-xinh-rang-khenh-de-thuong-duyen-dang.jpg',
  'tn':'Tên SP7',
  'th':'Thương hiệu',
  'gianhap':20000000,
  'giaban':21000000,
  'sl':10
}
]
  return (
    <div class="container-fluid">
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div class="row ">
          <div class="col-sm-3 mt-5 mb-4 text-gred">
            <div className="search">
              <form class="form-inline">
                <input
                  class="form-control mr-sm-2"
                  type="search"
                  placeholder="Tìm kiếm"
                  aria-label="Search"
                />
              </form>
            </div>
          </div>
          <div
            class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"
            style={{ color: "green" }}
          >
            <h2>
              <b>Quản lý sản phẩm</b>
            </h2>
          </div>
          <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
            <Button variant="primary" href="QLSanPham/create">
              Thêm sản phẩm
            </Button>
          </div>
        </div>
        <div class="row">
          <div class="table-responsive ">
            <table class="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Hình ảnh</th>
                  <th>Tên SP </th>
                  <th>Thuơng hiệu</th>
                  <th>Giá nhập khẩu</th>
                  <th>Giá bán </th>
                  <th>Số lượng</th>
                  <th>Tùy chọn</th>
                </tr>
              </thead>
              <tbody>
                  {Product.map((a, index) => (  
                    <tr>
                      <td>{index+1}</td>
                      <img src={a.anh} class="img-thumbnail" width={50}></img>
                      <td>{a.tn}</td>
                      <td>{a.th}</td>
                      <td>{a.gianhap} VND</td>
                      <td>{a.giaban} VND</td>
                      <td>{a.sl} cái</td>
                      <td>
                        <a
                          href="QLSanPham/detail"
                          class="view"
                          title="View"
                          data-toggle="tooltip"
                          style={{ color: "#10ab80",margin:"10px"}}
                          onClick={() => { LoadDetail(a.id) }}
                        >
                          <VisibilityTwoToneIcon/>
                        </a>
                        <a href="QLSanPham/eidt" class="edit" title="Edit" data-toggle="tooltip" onClick={() => { LoadEdit(a.id) }}>
                          <EditTwoToneIcon/>
                        </a>
                        <a
                          href="#"
                          class="delete"
                          title="Delete"
                          data-toggle="tooltip"
                          style={{ color: "red", margin:"10px"}}
                          onClick={() => { Removefunction(a.id) }}
                        >
                          <DeleteTwoToneIcon/>
                        </a>
                      </td>
                  </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductManager;