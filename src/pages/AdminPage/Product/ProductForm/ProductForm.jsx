import { RollbackOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Row } from "antd";
import { Formik, Form, FastField } from "formik";
import { Fragment, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import InputCommon from "../../../../common/Input/InputCommon";
import Paper from "../../../../common/Paper";
import SelectCommon from "../../../../common/Select/SelectCommon";
import { categoryList, companyList } from "../../../../constants";

const ProductForm = () => {
  const navigate = useNavigate();
  //! Props

  //! State

  //! Function
  const handleSubmit = useCallback((values) => {
    console.log("values", values);
  }, []);
  //! Effect

  //! Render
  return (
    <Fragment>
      <Paper style={{ marginBottom: "1rem" }}>
        <Flex align={"center"} justify={"space-between"}>
          <h4 style={{ marginBottom: "0" }}>Create product</h4>
          <Button
            icon={<RollbackOutlined />}
            onClick={() => {
              navigate("/admin/product", { replace: true });
            }}
          />
        </Flex>
      </Paper>
      <Paper>
        <Formik
          initialValues={{
            name: "",
            company: companyList[0].value,
            category: categoryList[0].value,
            price: 0,
            description: "",
          }}
          onSubmit={handleSubmit}
        >
          {() => {
            return (
              <Form>
                <Row gutter={16}>
                  <Col span={8}>
                    <FastField
                      component={InputCommon}
                      name="name"
                      title="Name product"
                      placeholder="Name product..."
                    />
                  </Col>
                  <Col span={8}>
                    <FastField
                      component={SelectCommon}
                      name="company"
                      options={companyList}
                      title="Company"
                      placeholder="Select company"
                      style={{ width: "100%" }}
                    />
                  </Col>
                  <Col span={8}>
                    <FastField
                      component={SelectCommon}
                      name="category"
                      options={categoryList}
                      title="Category"
                      placeholder="Select category"
                      style={{ width: "100%" }}
                    />
                  </Col>
                </Row>
                <Row gutter={16} style={{ marginTop: "1rem" }}>
                  <Col span={12}>
                    <FastField
                      component={InputCommon}
                      name="price"
                      title="Price product"
                      placeholder="Price product ..."
                      type="number"
                    />
                  </Col>
                  <Col span={12}>
                    <FastField
                      component={InputCommon}
                      name="description"
                      title="Description"
                      placeholder="Description product ..."
                      isTextArea={true}
                    />
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </Paper>
    </Fragment>
  );
};

export default ProductForm;
