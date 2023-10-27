import { useQuery } from "@tanstack/react-query";
import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import HeaderTable from "../../../common/HeaderTable";
import Paper from "../../../common/Paper";
import { adminContext } from "../../../context/AdminContext";
import { GetAnalyticService } from "../../../services/AnalyticService";
import { Card, Col, DatePicker, Flex, Row, Statistic } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import HashLoader from "react-spinners/HashLoader";
import { ArrowUpOutlined } from "@ant-design/icons";

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

const Analytic = () => {
  const { tokenAdmin, dispatch } = useContext(adminContext);
  //! Props

  //! State
  const today = new Date().toISOString().slice(0, 10);
  const lastWeek = new Date(new Date().setDate(new Date().getDate() - 6))
    .toISOString()
    .slice(0, 10);
  const [query, setQuery] = useState({
    startDate: lastWeek,
    endDate: today,
  });
  const [countData, setCountData] = useState({
    orders: 0,
    users: 0,
  });
  const { isLoading, isFetching, refetch } = useQuery(
    ["analytic"],
    () => GetAnalyticService(tokenAdmin, query),
    {
      enabled: false,
      onSuccess: (response) => {
        const { success } = response;
        if (success) {
          setCountData((prev) => {
            return {
              ...prev,
              orders: response?.dataCount.orders,
              users: response?.dataCount.users,
            };
          });
        } else {
          if (response?.statusCode === 404) {
            dispatch({ type: "LOG_OUT" });
          }
        }
      },
    }
  );
  //! Function
  const handleChange = useCallback((dates, datesString) => {
    if (datesString[0] === "" && datesString[1] === "") {
      setQuery((prev) => {
        return {
          ...prev,
          startDate: lastWeek,
          endDate: today,
        };
      });
    } else {
      setQuery((prev) => {
        return {
          ...prev,
          startDate: datesString[0],
          endDate: datesString[1],
        };
      });
    }
  }, []);
  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day");
  };
  //! Effect
  useEffect(() => {
    refetch && refetch();
  }, [query.startDate, query.endDate]);
  //! Render
  return (
    <Fragment>
      <HeaderTable title={"Analytic"} onRefetch={refetch} />
      <Paper>
        <RangePicker
          disabledDate={disabledDate}
          value={[
            dayjs(query.startDate, dateFormat),
            dayjs(query.endDate, dateFormat),
          ]}
          onChange={handleChange}
          style={{ marginBottom: "1rem" }}
          presets={() => {
            console.log("clear");
          }}
        />
        {isLoading || isFetching ? (
          <Flex align={"center"} justify="center" style={{ height: "500px" }}>
            <HashLoader size={45} color="#decbc0" />
          </Flex>
        ) : (
          <Fragment>
            <Row gutter={16} style={{ marginBottom: "1rem" }}>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="Orders"
                    value={countData?.orders}
                    valueStyle={{ color: "#3f8600" }}
                    prefix={<ArrowUpOutlined />}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="Users"
                    value={countData?.users}
                    valueStyle={{ color: "#3f8600" }}
                    prefix={<ArrowUpOutlined />}
                  />
                </Card>
              </Col>
            </Row>
          </Fragment>
        )}
      </Paper>
    </Fragment>
  );
};

export default Analytic;
