import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Divider, Button, Input } from "antd";

const tempOptionValue = (indexList) => {
  return (
    <Form.List name={[indexList, "optionValue"]}>
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map((value, index) => (
              <div key={value.key}>
                <Form.Item
                  className=""
                  name={[index]}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập giá trị",
                    },
                  ]}
                >
                  <Input placeholder="" />
                </Form.Item>
                {fields.length > 1 ? (
                  <Button
                    type="danger"
                    onClick={() => remove(value.name)}
                    style={{ width: "10%" }}
                    title="Xóa"
                    icon={<MinusCircleOutlined style={{ width: "100%" }} />}
                  ></Button>
                ) : null}
              </div>
            ))}
            <Form.Item>
              <Button
                onClick={() => add()}
              >
                <PlusOutlined/>
              </Button>
            </Form.Item>
          </div>
        );
      }}
    </Form.List>
  );
};

function Option(props) {
  return (
    <Form.List name="options">
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map((field, index) => (
              <div key={field.key}>
                <p>--------------------------------------------------------</p>
                <Form.Item
                  className=""
                  name={[index, "optionName"]}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập giá trị",
                    },
                  ]}
                >
                  <Input
                    name={[index, "optionName"]}
                    placeholder="Tên thuộc tính"
                  />
                </Form.Item>
                {tempOptionValue(index)}
                {fields.length > 1 ? (
                  <Button
                    type="danger"
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                    style={{ width: "10%" }}
                    title="Xóa"
                    icon={<MinusCircleOutlined style={{ width: "100%" }} />}
                  ></Button>
                ) : null}
              </div>
            ))}
            <Divider />
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: "60%" }}
              >
                <PlusOutlined /> Thêm thuộc tính
              </Button>
            </Form.Item>
          </div>
        );
      }}
    </Form.List>
  );
}

export default Option;
