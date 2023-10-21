import { Fragment, useCallback } from "react";
import "./CheckoutPage.scss";
import HeaderCart from "../../components/Header/HeaderCart";
import FormCheckout from "../../components/FormCheckout/FormCheckout";
import ProductCheckout from "../../components/ProductCheckout/ProductCheckout";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const CheckoutPage = () => {
  //! Props

  //! State

  //! Function
  const handleSubmit = useCallback((values) => {
    console.log("responseDataSubmit", values);
  }, []);
  //! Effect

  //! Render
  return (
    <Fragment>
      <HeaderCart />
      <section className="section-center checkout-content">
        <Formik
          initialValues={{
            name: "",
            email: "",
            phoneNumber: "",
            address: "",
            note: "",
            paymentMethod: "COD",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Required!").trim(),
            phoneNumber: Yup.string()
              .required("Require!")
              .max(10, "Invalid phone number!")
              .min(10, "Invalid phone number!")
              .trim(),
            email: Yup.string()
              .required("Require!")
              .email("Invalid email!")
              .trim(),
            address: Yup.string().required("Required!").trim(),
          })}
          enableReinitialize
          validateOnBlur={false}
          validateOnChange={false}
          validateOnMount={false}
          onSubmit={handleSubmit}
        >
          {(helperFormik) => {
            return (
              <Form>
                <FormCheckout helperFormik={helperFormik} />
                <ProductCheckout />
              </Form>
            );
          }}
        </Formik>
      </section>
    </Fragment>
  );
};

export default CheckoutPage;
