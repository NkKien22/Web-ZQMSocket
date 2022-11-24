import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ClientEdit = () => {
  const { pid } = useParams();
  useEffect(() => {
    fetch("#" + pid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        idCh(resp.id);
        ImageCh(resp.Image);
        usernameCh(resp.username);
        EmailCh(resp.Email);
        PhoneNumberCh(resp.PhoneNumber);
        AddressCh(resp.Address);
        GenderCh(resp.Gender);
        DOBCh(resp.DOB);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const [id, idCh] = useState("");
  const [Image, ImageCh] = useState("");
  const [username, usernameCh] = useState("");
  const [Email, EmailCh] = useState("");
  const [PhoneNumber, PhoneNumberCh] = useState("");
  const [Address, AddressCh] = useState("");
  const [Gender, GenderCh] = useState("");
  const [DOB, DOBCh] = useState("");
  const [validation, valchange] = useState(false);
  const navigate = useNavigate();
  const handlesubmit = (e) => {
    e.preventDefault();
    const empdata = {
        Image,
        username,
        Email,
        PhoneNumber,
        Address,
        Gender,
        DOB,
    };
    fetch("#" + pid, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empdata),
    })
      .then((res) => {
        alert("Saved successfully.");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div class="container-fluid">
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2>Sửa người dùng</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Ảnh người dùng</label>
                      <input
                        required
                        value={Image}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => ImageCh(e.target.value)}
                        className="form-control"
                      ></input>
                      {Image.length == 0 && validation && (
                        <span className="text-danger">Chưa nhập link ảnh</span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Tên người dùng</label>
                      <input
                        required
                        value={username}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => usernameCh(e.target.value)}
                        className="form-control"
                      ></input>
                      {username.length == 0 && validation && (
                        <span className="text-danger">Chưa nhập tên</span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        required
                        value={Email}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => EmailCh(e.target.value)}
                        className="form-control"
                      ></input>
                      {Email.length == 0 && validation && (
                        <span className="text-danger">
                          Chưa nhập email
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Số điện thoại</label>
                      <input
                      type={"number"}
                        required
                        value={PhoneNumber}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => PhoneNumberCh(e.target.value)}
                        className="form-control"
                      ></input>
                      {PhoneNumber.length == 0 && validation && (
                        <span className="text-danger">
                          Chưa nhập số điện thoại
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Địa chỉ</label>
                      <input
                        required
                        value={Address}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => AddressCh(e.target.value)}
                        className="form-control"
                      ></input>
                      {Address.length == 0 && validation && (
                        <span className="text-danger">Chưa nhập địa chỉ</span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Giới tính</label>
                      <input type={"checkbox"} value={Gender}></input>
                      <label>Nam/Nữ</label>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">
                        Lưu
                      </button>
                      <Link to="/QLSanPham" className="btn btn-danger">
                        Quay lại
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ClientEdit;