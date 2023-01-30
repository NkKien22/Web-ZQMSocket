import { useState , useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Drawer,
  Form,
  Pagination,
  Input,
  notification,
  Tag,
  Button,
  Checkbox,
  message,
  Row,
  Col,
  Select,
  Table,
  Space,
  InputNumber,
  Typography,
  Popconfirm,
  Upload,
  Modal,
} from "antd";
import {
  MinusCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  FundFilled,
  PlusOutlined,
} from "@ant-design/icons";
import { URL_API } from "../../utils/common";
import axios from "axios";
import { set } from "lodash";
const ProductEdit = (props) => {
  const [form] = Form.useForm();
  const [ProductID, ProductIDCh] = useState("");
  const [ProductName, ProductNameCh] = useState("");
  const [BrandName, BrandNameCh] = useState("");
  const [ImportPrice, ImportPriceCh] = useState("");
  const [Price, PriceCh] = useState("");
  const [Quantity, QuantityCh] = useState("");
  const [validation, valchange] = useState(false);
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState();
  const [indexSelect, setIndexSelect] = useState(-1);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [Images, setImages] = useState([]);
  const [valueOption, setValueOption] = useState("");
  const [indexOption, setIndexOption] = useState(-1);
  const [indexSelectDom, setIndexSelectDom] = useState(-1);
  useEffect(() => {
    form.setFieldValue(props)
    let options = props.options?.map(el =>({name:el.name,values:el.optionValues?.map(value => (value.value))}));
    setOptions(options);
    let images = props.productVariants?.map((el,index)=> (el.images?.map(image => ({
      "id": index,
      "url": image.thumbnail,
      "media": image.thumbnail,
      "thumb": image.thumbnail,
      "width": 200,
      "height": 200
  }))))
  setImages(images);
  }, [props]);
  const formData = [
    {name:["productName"],value:props.productName},
    {name:["brand"],value:props.brand},
    {name:["productVariants"],value:props.productVariants}
  ]
  const navigate = useNavigate();
  const handleCancel = () => setPreviewOpen(false);
  const setImageWithIndex = (prop) => {
    if (indexSelect + 1 > Images.length) {
      let images = [...Images, [prop]];
      setImages([...images]);
      setFileList([...fileList, prop]);
    } else {
      let images = Images;
      images[indexSelect] = [...images[indexSelect], prop];
      setImages(images);
      setFileList([...fileList, prop]);
    }
  };
  const uploadFile = (fileOption) => {
    const { onSuccess, onError, file } = fileOption;
    if (file) {
      let formData = new FormData();
      let files = file;
      formData.append("media", files);
      formData.append("key", "000027c23a82224c791a5fa2f82e5c9a");
      axios
        .post("https://thumbsnap.com/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(async (res) => {
          console.log(res);

          let dataImg = res.data.data;
          if (res.status == 200) {
            const fileImage = {
              uid: dataImg.id,
              name: file.fileName,
              status: "done",
              url: dataImg.media,
            };
            await setImageWithIndex(fileImage);
          } else {
            message.error({
              content: "Thêm ảnh lỗi",
              className: "erroNotFound-class",
              style: {
                marginTop: "3vh",
              },
            });
          }
        });
    }
  };
  const onFinish = (values) => {
    values.productVariants.map((el,index)=>{
      el.images = Images[index]!== undefined?Images[index].map(el => ({original:el.url,thumbnail:el.url})):null
    })
    const payload = {
      productName: values.productName,
      brand: values.brand,
      isProductEnabled:true,
      options:options,
      productVariants:values.productVariants,
    };
    axios.put(`${URL_API}/Product/update-product/${props.id}`, payload).then((res) => {        if (res)
      notification.success({
        message: "Cập nhật sản phẩm thành công",
      });});
  };
  const onChangeInputOptionName = (e) => {
    let value = e.target.value;
    setOption(value);
  };
  const handleRemoveOptions = (index) => {
    const list = [...options];
    list.splice(index, 1);
    setOptions(list);
  };
  const addNewOptions = () => {
    form.setFieldsValue({ InputOptionName: "" });
    setOptions([...options, { name: option, values: [] }]);
  };
  const addNewValueOption = (index) => {
    var dom = document.getElementById(`${index}`);
    var value = dom.value;
    var optionChange = options[index];
    optionChange?.values.push(value);
    setOptions([...options]);
  };
  const setIndex = (index) => {
    Images[index] === undefined ? setFileList([]) : setFileList(Images[index]);
    setIndexSelect(index);
  };
  const changeValueOption = (e) => {};

  const handleSeleted = (e)=>{
    var dom = document.getElementById(`select-${indexSelectDom}`)
  }
  const getOptionValuesByOptionName = (optionName) =>{
    var values = options.filter(el => el.name === optionName)
    return values;
  }
  return (
    <div class="container-fluid">
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
            fields={formData}
          >
            <Form.Item
              name="productName"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập sản phẩm",
                },
              ]}
            >
              <Input placeholder="Tên Sản Phẩm" />
            </Form.Item>

            <Form.Item
              name="brand"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thương hiệu!",
                },
              ]}
            >
              <Input placeholder="Thương Hiệu" />
            </Form.Item>

            <div className="border">
              <Form.Item>
                <Input
                  style={{ width: "80%" }}
                  name={"InputOptionName"}
                  value={option}
                  onChange={onChangeInputOptionName}
                  placeholder="Hãy nhập tên thuộc tính : ( Ram, CPU, MainBoard...) "
                />{" "}
                <Button
                  onClick={addNewOptions}
                  className="btn-box inline float-end"
                >
                  <PlusOutlined style={{ marginLeft: "6px" }} />{" "}
                </Button>
              </Form.Item>

              {options?.map((el, index) => (
                <div>
                  <Tag style={{ width: "50%" }}>{el.name}</Tag>
                  <Input
                    onClick={() => setIndexOption(index)}
                    id={index}
                    onChange={changeValueOption}
                    style={{ width: "20%" }}
                  />{" "}
                  <Button
                    onClick={() => addNewValueOption(index)}
                    className="btn-box inline"
                  >
                    <PlusOutlined />{" "}
                  </Button>
                  <Button className="btn-box inline float-end">
                    <DeleteOutlined
                      onClick={() => handleRemoveOptions(index)}
                    />
                  </Button>
                  <div>
                    {el.values?.map((value, indexValue) => (
                      <span>
                        <Tag>{value}</Tag>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Form.List name="productVariants">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name }) => {
                    return (
                      <div>
                        <Form.Item
                          label="Giá nhập"
                          name={[name, "importPrice"]}
                          rules={[
                            {
                              required: true,
                              message: "Giá nhập không được để trống",
                            },
                          ]}
                        >
                          <Input placeholder="Điền giá nhập của sản phẩm" />
                        </Form.Item>
                        <Form.Item
                          label="Giá bán"
                          name={[name, "price"]}
                          rules={[
                            {
                              required: true,
                              message: "Giá bán không được để trống",
                            },
                          ]}
                        >
                          <Input placeholder="Điền giá bán của sản phẩm" />
                        </Form.Item>
                        <Form.Item
                          label="Số lượng"
                          name={[name, "quantity"]}
                          rules={[
                            {
                              required: true,
                              message: "Số lượng không được để trống",
                            },
                          ]}
                        >
                          <Input placeholder="Điền số lượng của sản phẩm" />
                        </Form.Item>
                        <Form.List name={[name, "optionValues"]}>
                          {() => {
                            return (
                              <Col span={50}>
                                {options.map((el, index) => {
                                  return (
                                    <div key={index}>
                                      {el.Name}
                                      <Form.Item
                                        hidden
                                        name={[index, "option"]}
                                        initialValue={el.name}
                                      ></Form.Item>
                                      <Form.Item name={[index, "value"]}>
                                        <Select
                                          placeholder={el.name}
                                          style={{
                                            width: 120,
                                          }}
                                          onClick={setIndexSelectDom(index)}
                                          id={`select-${index}`}
                                          onChange={handleSeleted}
                                          options={ getOptionValuesByOptionName(el.name)[0].values.map((x) => ({
                                            value: x,
                                            label: x,
                                          }))}
                                        />
                                      </Form.Item>
                                    </div>
                                  );
                                })}
                              </Col>
                            );
                          }}
                        </Form.List>
                        <div key={key} onClick={() => setIndex(key)}>
                          <div className="title">Media</div>
                          <Upload
                            onPreview={() => {}}
                            onChange={() => {}}
                            customRequest={uploadFile}
                            fileList={
                              indexSelect == key ? fileList : Images[key]
                            }
                            listType="picture-card"
                            className="upload-list-inline"
                            name="file"
                            multiple
                          >
                            <div>
                              <PlusOutlined />
                              <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                          </Upload>
                          <Modal
                            open={previewOpen}
                            title={previewTitle}
                            footer={null}
                            onCancel={handleCancel}
                          >
                            <img
                              alt="example"
                              style={{ width: "100%" }}
                              src={previewImage}
                            />
                          </Modal>
                        </div>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </div>
                    );
                  })}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Thêm sản phẩm
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item className="mt-5">
              <Button type="primary" htmlType="submit">
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;
