import {
  MinusOutlined,
  PlusOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Flex, Row } from "antd";
import { Formik, Form, FastField } from "formik";
import { Fragment, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import InputCommon from "../../../../common/Input/InputCommon";
import Paper from "../../../../common/Paper";
import SelectCommon from "../../../../common/Select/SelectCommon";
import { categoryList, colorsList, companyList } from "../../../../constants";
import UploadImages from "./UploadImages";

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
                <Row gutter={16} style={{ marginTop: "1rem" }}>
                  <Card
                    title="Colors"
                    style={{ width: "100%" }}
                    extra={<Button icon={<PlusOutlined />} />}
                  >
                    <Card.Grid style={{ width: "100%" }}>
                      <Row
                        gutter={16}
                        style={{ justifyContent: "space-between" }}
                      >
                        <Col span={1}>
                          <Flex align="center" justify="center">
                            <div
                              style={{
                                width: "32px",
                                height: "32px",
                                background: "red",
                                borderRadius: "4px",
                              }}
                            />
                          </Flex>
                        </Col>
                        <Col span={10}>
                          <FastField
                            component={SelectCommon}
                            name="color"
                            // title="Color"
                            placeholder="Color product ..."
                            options={colorsList}
                            style={{ width: "100%" }}
                          />
                        </Col>
                        <Col span={10}>
                          <FastField
                            component={InputCommon}
                            name="amount"
                            // title="Amount"
                            placeholder="Amount product ..."
                            type="number"
                          />
                        </Col>
                        <Col span={1}>
                          <Flex align="end" justify="center">
                            <Button icon={<MinusOutlined />} />
                          </Flex>
                        </Col>
                      </Row>
                    </Card.Grid>
                  </Card>
                </Row>
                <Row gutter={16} style={{ marginTop: "1rem" }}>
                  <UploadImages />
                </Row>
                <Row
                  gutter={16}
                  style={{ marginTop: "16px", justifyContent: "flex-start" }}
                >
                  <button
                    className="btn"
                    style={{ padding: "12px 16px", width: "150px" }}
                    type="submit"
                  >
                    save
                  </button>
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
