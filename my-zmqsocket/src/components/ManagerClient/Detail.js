import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const ClientDetail = () => {
    const { pid } = useParams();
    const [Clientdata, Clientdatachange] = useState({});
    useEffect(() => {
        fetch("http://localhost:8000/employee/" + pid).then((res) => {
            return res.json();
        }).then((resp) => {
            Clientdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);
    return (
        <div class="container-fluid">
               <div className="container">
            <div className="card row" style={{ "textAlign": "left" }}>
                <div className="card-title">
                    <h2>Chi tiết sản phẩm</h2>
                </div>
                <div className="card-body"></div>
                {Clientdata &&
                    <div>
                        <img src={Clientdata.Image} width={200}></img>
                        <h5>Tên Người dùng: {Clientdata.username}</h5>
                        <h5>Tên Email: {Clientdata.Email}</h5>
                        <h5>Số điện thoại: {Clientdata.PhoneNumber}</h5>
                        <h5>Địa chỉ: {Clientdata.Address}</h5>
                        <h5>Giới tính: {Clientdata.Gender==true?"Nam":"Nữ"}</h5>
                        <h5>Ngày sinh: {Clientdata.DOB}</h5>
                        <Link className="btn btn-danger" to="/qltaikhoan">Quay lại danh sách</Link>
                    </div>
                }
            </div>
            </div>
            {/* </div>
            </div> */}
        </div >
    );
}

export default ClientDetail;