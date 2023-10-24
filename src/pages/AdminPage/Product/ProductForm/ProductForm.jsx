import {
  MinusOutlined,
  PlusOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Flex, Row } from "antd";
import { Formik, Form, FastField } from "formik";
import { Fragment, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputCommon from "../../../../common/Input/InputCommon";
import Paper from "../../../../common/Paper";
import SelectCommon from "../../../../common/Select/SelectCommon";
import { categoryList, colorsList, companyList } from "../../../../constants";
import UploadImages from "./UploadImages";
import * as Yup from "yup";
import { cloneDeep } from "lodash";
import { useMutation } from "@tanstack/react-query";
import { CreateProductService } from "../../../../services/ProductService";
import { adminContext } from "../../../../context/AdminContext";
import { toast } from "react-toastify";

const ProductForm = () => {
  const navigate = useNavigate();
  const { tokenAdmin } = useContext(adminContext);
  //! Props

  //! State
  const [fileList, setFileList] = useState([
    // {
    //   uid: "-1",
    //   name: "image.png",
    //   // status: "done",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
  ]);
  const mutateCreate = useMutation({
    mutationFn: (data) => CreateProductService(data, tokenAdmin),
  });
  //! Function
  const handleSubmit = useCallback(
    async (values) => {
      console.log("values", values, fileList);
      const stock = cloneDeep(values.stock).reduce((result, current) => {
        if (result.find((el) => el?.color === current.color)) {
          const arr = result.map((el) => {
            if (el.color === current.color) {
              return {
                color: el.color,
                amount: Number(el.amount) + Number(current.amount),
              };
            } else {
              return el;
            }
          });
          return arr;
        } else {
          return [...result, current];
        }
      }, []);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("images", JSON.stringify(fileList));
      formData.append("stock", JSON.stringify(stock));
      formData.append("company", values.company);
      formData.append("description", values.description);
      formData.append("category", values.category);
      try {
        const response = await mutateCreate.mutateAsync(formData);
        console.log("response", response);
        const { success, message } = response;
        if (!success) {
          throw new Error(message);
        }
        toast.success(message);
        navigate("/admin/product", { replace: true });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    },
    [fileList]
  );

  const handleAddColor = useCallback((helperFormik) => {
    const { values, setFieldValue } = helperFormik;
    setFieldValue("stock", [...values.stock, { amount: 0, color: "" }]);
  }, []);

  const handleRemoveColor = useCallback((index, helperFormik) => {
    const { values, setFieldValue } = helperFormik;
    const stock = cloneDeep(values.stock).filter((el, ind) => ind !== index);
    setFieldValue("stock", stock);
  }, []);
  //! Effect

  //! Render
  return (
    <Fragment>
      <Formik
        initialValues={{
          name: "",
          company: companyList[0].value,
          category: categoryList[0].value,
          price: 0,
          description: "",
          stock: [{ color: "", amount: 0 }],
        }}
        enableReinitialize
        validationSchema={Yup.object({
          name: Yup.string().required("Required!"),
          company: Yup.string().required("Required!"),
          category: Yup.string().required("Required!"),
          price: Yup.number().required("Require!"),
          description: Yup.string().required("Required!"),
        })}
        validateOnBlur={false}
        validateOnChange={false}
        validateOnMount={false}
        onSubmit={handleSubmit}
      >
        {(helperFormik) => {
          return (
            <Form>
              <Paper style={{ marginBottom: "1rem" }}>
                <Flex align={"center"} justify={"space-between"}>
                  <h4 style={{ marginBottom: "0" }}>Create product</h4>
                  <Flex align={"center"} justify="flex-end" gap={"middle"}>
                    <button
                      className="btn"
                      type="submit"
                      style={{ padding: "6px 24px" }}
                    >
                      save
                    </button>
                    <Button
                      icon={<RollbackOutlined />}
                      onClick={() => {
                        navigate("/admin/product", { replace: true });
                      }}
                    />
                  </Flex>
                </Flex>
              </Paper>
              <Paper
                style={{ height: "calc(100vh - 184px)", overflowY: "auto" }}
              >
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
                      prefix={"đ"}
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
                    extra={
                      <Button
                        icon={<PlusOutlined />}
                        onClick={() => handleAddColor(helperFormik)}
                      />
                    }
                  >
                    {(helperFormik.values.stock || []).map((el, index) => {
                      return (
                        <Card.Grid style={{ width: "100%" }} key={index}>
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
                                    background: el.color
                                      ? el.color
                                      : "transparent",
                                    borderRadius: "4px",
                                  }}
                                />
                              </Flex>
                            </Col>
                            <Col span={10}>
                              <FastField
                                component={SelectCommon}
                                name={`stock[${index}].color`}
                                placeholder="Color product ..."
                                options={colorsList}
                                style={{ width: "100%" }}
                              />
                            </Col>
                            <Col span={10}>
                              <FastField
                                component={InputCommon}
                                name={`stock[${index}].amount`}
                                placeholder="Amount product ..."
                                type="number"
                              />
                            </Col>
                            <Col span={1}>
                              <Flex align="end" justify="center">
                                <Button
                                  icon={<MinusOutlined />}
                                  disabled={
                                    helperFormik.values.stock.length === 1
                                  }
                                  onClick={() =>
                                    handleRemoveColor(index, helperFormik)
                                  }
                                />
                              </Flex>
                            </Col>
                          </Row>
                        </Card.Grid>
                      );
                    })}
                  </Card>
                </Row>
                <Row gutter={16} style={{ marginTop: "1rem" }}>
                  <UploadImages fileList={fileList} setFileList={setFileList} />
                </Row>
              </Paper>
            </Form>
          );
        }}
      </Formik>
    </Fragment>
  );
};

export default ProductForm;
