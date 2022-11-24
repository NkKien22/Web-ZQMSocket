
import { Button, Modal, Input } from "react-bootstrap";
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function ClientManager() {
  const [empdata, empdatachange] = useState(null);//Thêm link api get all user
  const navigate = useNavigate();
  const LoadDetail = (id) => {
    navigate("/qltaikhoan/detail/" + id);
}
const LoadEdit = (id) => {
    navigate("/qltaikhoan/edit/" + id);
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
    'id':1,
    'anh':'https://kynguyenlamdep.com/wp-content/uploads/2022/06/co-nang-nhi-nhanh-700x700.jpg',
    'tn':'Tên ND1',
    'mail':'mail@gmail.com',
    'sdt':'0989609253',
    'dchi':'Địa chỉ1',
    'gtinh':'Nư',
    'ngsinh':'06-06-2002'
  },
  {
    'id':2,
    'anh':'https://toigingiuvedep.vn/wp-content/uploads/2021/06/hinh-anh-gai-xinh-de-thuong-nhat-1.jpg',
    'tn':'Tên ND2',
    'mail':'mail@gmail.com',
    'sdt':'0989609253',
    'dchi':'Địa chỉ2',
    'gtinh':'Nư',
    'ngsinh':'06-06-2002'
  },
  {
    'id':3,
    'anh':'https://kynguyenlamdep.com/wp-content/uploads/2022/06/co-nang-nhi-nhanh-700x700.jpg',
    'tn':'Tên ND3',
    'mail':'mail@gmail.com',
    'sdt':'0989609253',
    'dchi':'Địa chỉ3',
    'gtinh':'Nư',
    'ngsinh':'06-06-2002'
  },
  {
    'id':4,
    'anh':'https://kynguyenlamdep.com/wp-content/uploads/2022/06/co-nang-nhi-nhanh-700x700.jpg',
    'tn':'Tên ND4',
    'mail':'mail@gmail.com',
    'sdt':'0989609253',
    'dchi':'Địa chỉ4',
    'gtinh':'Nư',
    'ngsinh':'06-06-2002'
  },
  {
    'id':5,
    'anh':'https://kynguyenlamdep.com/wp-content/uploads/2022/06/co-nang-nhi-nhanh-700x700.jpg',
    'tn':'Tên ND5',
    'mail':'mail@gmail.com',
    'sdt':'0989609253',
    'dchi':'Địa chỉ5',
    'gtinh':'Nư',
    'ngsinh':'06-06-2002'
  },
  {
    'id':6,
    'anh':'https://kynguyenlamdep.com/wp-content/uploads/2022/06/co-nang-nhi-nhanh-700x700.jpg',
    'tn':'Tên ND6',
    'mail':'mail@gmail.com',
    'sdt':'0989609253',
    'dchi':'Địa chỉ6',
    'gtinh':'Nư',
    'ngsinh':'06-06-2002'
  },
  {
    'id':7,
    'anh':'https://kynguyenlamdep.com/wp-content/uploads/2022/06/co-nang-nhi-nhanh-700x700.jpg',
    'tn':'Tên ND7',
    'mail':'mail@gmail.com',
    'sdt':'0989609253',
    'dchi':'Địa chỉ7',
    'gtinh':'Nư',
    'ngsinh':'06-06-2002'
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
              <b>QL khách hàng</b>
            </h2>
          </div>
        </div>
        <div class="row">
          <div class="table-responsive ">
            <table class="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Hình ảnh</th>
                  <th>Tên người dùng</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Địa chỉ</th>
                  <th>Giới tính</th>
                  <th>Ngày sinh</th>
                  <th>Tùy chọn</th>
                </tr>
              </thead>
              <tbody>
                  {Product.map((a, index) => (  
                    <tr>
                      <td>{index+1}</td>
                      <img src={a.anh} class="img-thumbnail" width={50}></img>
                      <td>{a.tn}</td>
                      <td>{a.mail}</td>
                      <td>{a.sdt}</td>
                      <td>{a.dchi}</td>
                      <td>{a.gtinh}</td>
                      <td>{a.ngsinh}</td>
                      <td>
                        <a
                          href="qltaikhoan/detail"
                          class="view"
                          title="View"
                          data-toggle="tooltip"
                          style={{ color: "#10ab80",margin:"10px"}}
                          onClick={() => { LoadDetail(a.id) }}
                        >
                          <VisibilityTwoToneIcon/>
                        </a>
                        <a href="qltaikhoan/edit" class="edit" title="Edit" data-toggle="tooltip" onClick={() => { LoadEdit(a.id) }}>
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
export default ClientManager;