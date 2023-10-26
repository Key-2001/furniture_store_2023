/* eslint-disable react/prop-types */
import { Fragment, useCallback, useContext } from "react";
import { FastField, Form, Formik } from "formik";
import { Button, Drawer, Flex, Space } from "antd";
import InputCommon from "../../../../common/Input/InputCommon";
import { useMutation } from "@tanstack/react-query";
import {
  CreateDiscountService,
  UpdateDiscountService,
} from "../../../../services/DiscountService";
import { adminContext } from "../../../../context/AdminContext";
import * as Yup from "yup";
import { toast } from "react-toastify";

const DiscountDrawer = (props) => {
  const { tokenAdmin } = useContext(adminContext);
  //! Props
  const { discount, onClose, isOpen, refetch } = props;
  //! State
  const mutateCreate = useMutation({
    mutationFn: (data) => CreateDiscountService(data, tokenAdmin),
  });
  const mutateUpdate = useMutation({
    mutationFn: (data) => UpdateDiscountService(discount._id, data, tokenAdmin),
  });
  //! Function
  const handleSubmit = useCallback(async (values) => {
    try {
      if (discount) {
        const response = await mutateUpdate.mutateAsync({
          idDiscount: values.discountCode,
          valueDiscount: values.valueDiscount,
          amountUse: values.amountUse,
        });
        const { success, message } = response;
        if (!success) {
          throw new Error(message);
        }
        toast.success(message);
        refetch && refetch();
        onClose && onClose();
      } else {
        const response = await mutateCreate.mutateAsync({
          idDiscount: values.discountCode,
          valueDiscount: values.valueDiscount,
          amountUse: values.amountUse,
        });
        const { success, message } = response;
        if (!success) {
          throw new Error(message);
        }
        toast.success(message);
        refetch && refetch();
        onClose && onClose();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, []);
  //! Effect
  //! Render
  return (
    <Fragment>
      <Formik
        initialValues={{
          discountCode: discount?.idDiscount ?? "",
          valueDiscount: discount?.valueDiscount ?? "",
          amountUse: discount?.amountUse ?? 0,
        }}
        enableReinitialize
        validationSchema={Yup.object({
          discountCode: Yup.string().required("Require!").trim(),
          valueDiscount: Yup.string().required("Require!").trim(),
          amountUse: Yup.number().required("Required!"),
        })}
        validateOnBlur={false}
        validateOnChange={false}
        validateOnMount={false}
        // onSubmit={handleSubmit}
      >
        {(helperFormik) => {
          return (
            <Form>
              <Drawer
                title={discount ? `Update discount` : "Create discount"}
                placement="right"
                onClose={onClose}
                open={isOpen}
                extra={
                  <Space>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                      type="primary"
                      onClick={() => handleSubmit(helperFormik.values)}
                      htmlType="submit"
                      disabled={
                        helperFormik.values.discountCode === "" ||
                        helperFormik.values.valueDiscount === "" ||
                        helperFormik.values.amountUse === 0
                      }
                      loading={mutateCreate.isLoading || mutateUpdate.isLoading}
                    >
                      OK
                    </Button>
                  </Space>
                }
              >
                <Fragment>
                  <Flex vertical gap="middle">
                    <FastField
                      component={InputCommon}
                      title="Discount code"
                      name="discountCode"
                      placeholder="Discount code ..."
                    />
                    <FastField
                      component={InputCommon}
                      title="Value"
                      name="valueDiscount"
                      placeholder="Discount value ..."
                    />
                    <FastField
                      component={InputCommon}
                      title="Number of uses"
                      name="amountUse"
                      placeholder="Number ..."
                      type="number"
                    />
                  </Flex>
                </Fragment>
              </Drawer>
            </Form>
          );
        }}
      </Formik>
    </Fragment>
  );
};

export default DiscountDrawer;
