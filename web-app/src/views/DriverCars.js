import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Typography, Grid, Card, Avatar, Button } from "@mui/material";
import { colors } from "../components/Theme/WebTheme";
import moment from "moment/min/moment-with-locales";
import { useNavigate } from "react-router-dom";
import { MAIN_COLOR, SECONDORY_COLOR } from "../common/sharedFunctions";

function DriverCars() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir();
  const [data, setData] = useState([]);
  const carlistdata = useSelector((state) => state.carlistdata);
  const [activeCar, setActiveCar] = useState({});
  const [otherCars, setOtherCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (carlistdata.cars) {
      setData(carlistdata.cars.filter((item) => item.driver === id.toString()));
    } else {
      setData([]);
    }
  }, [carlistdata.cars, id]);

  useEffect(() => {
    if (data) {
      setActiveCar(data.filter((item) => item.active === true)[0]);
      setOtherCars(data.filter((item) => item.active !== true));
    } else {
      setActiveCar([]);
      setOtherCars([]);
    }
  }, [data]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: isRTL === "rtl" ? "row-reverse" : "row",
          justifyContent: isRTL === "rtl" ? "flex-end" : "flex-start",
        }}
      >
        <Button
          variant="text"
          onClick={() => {
            navigate("/users");
          }}
          sx={{ mb: 2 }}
        >
          <Typography
            style={{
              margin: "10px 10px 0 5px",
              textAlign: isRTL === "rtl" ? "right" : "left",
              fontWeight: "bold",
              color: MAIN_COLOR,
            }}
          >
            {`<<- ${t("go_back")}`}
          </Typography>
        </Button>
      </div>

      <Grid container spacing={1} sx={{ direction:isRTL === "rtl" ? "rtl" : "ltr",}}>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <>
            <Card
              style={{
                borderRadius: "5px",
                backgroundColor: MAIN_COLOR,
                marginTop: 5,
                marginBottom: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h5"
                style={{
                  textAlign: "center",
                  color: colors.WHITE,
                }}
              >
                {t("active_car")}
              </Typography>
            </Card>

            <Card
              style={{
                borderRadius: "19px",
                backgroundColor: "#fff",
                minHeight: 100,
                padding: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                boxShadow: `0px 2px 5px ${SECONDORY_COLOR}`,
              }}
            >
              {activeCar ? (
                <Grid container direction="column" gap={2} padding={3}>
                  <Grid
                    item
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {activeCar?.car_image ? (
                      <Avatar
                        alt="Id Image"
                        src={activeCar.car_image}
                        sx={{
                          width: 300,
                          height: 200,
                          borderRadius: "19px",
                        }}
                        variant="square"
                      />
                    ) : (
                      <Avatar sx={{ width: 460, height: 240 }} variant="square">
                        Car Image
                      </Avatar>
                    )}
                  </Grid>
                  <Grid
                    item
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Card
                      style={{
                        borderRadius: "19px",
                        backgroundColor:
                          activeCar?.approved === true
                            ? colors.GREEN
                            : colors.RED,
                        minWidth: "40%",
                        minHeight: 10,
                        padding: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: 16,
                          textAlign: "center",
                          color: "white",
                        }}
                      >
                        {activeCar?.approved
                          ? t("approved")
                          : t("not_approved")}
                      </Typography>
                    </Card>
                    <Card
                      style={{
                        borderRadius: "19px",
                        backgroundColor: MAIN_COLOR,
                        minWidth: "40%",
                        minHeight: 10,
                        padding: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: 16,
                          textAlign: "center",
                          color: colors.WHITE,
                        }}
                      >
                        {activeCar?.carType}
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      spacing={1}
                      sx={{ direction:isRTL === "rtl" ? "rtl" : "ltr",}}
                    >
                      <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                        <Card
                          style={{
                            borderRadius:
                              isRTL === "rtl"
                                ? "0 15px 15px 0"
                                : "15px 0 0 15px",
                            backgroundColor: MAIN_COLOR,
                            minHeight: 80,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            padding: 10,
                            boxShadow: `0px 2px 5px ${SECONDORY_COLOR}`,
                          }}
                        >
                          <Typography
                            style={{
                              color: "white",
                              textAlign: "center",
                              fontSize: 16,
                            }}
                          >
                            {t("createdAt")}
                          </Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Card
                          style={{
                            borderRadius:
                              isRTL === "rtl"
                                ? "15px 0 0 15px "
                                : "0 15px 15px 0",
                            backgroundColor: colors.WHITE,
                            minHeight: 80,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            padding: 10,
                            boxShadow: `0px 2px 5px ${SECONDORY_COLOR}`,
                          }}
                        >
                          <Typography
                            style={{
                              color: "Black",
                              textAlign: "center",
                              fontSize: 18,
                              fontWeight: "bold",
                            }}
                          >
                            {activeCar?.createdAt
                              ? moment(activeCar?.createdAt).format("lll")
                              : null}
                          </Typography>
                        </Card>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      spacing={1}
                      sx={{ direction:isRTL === "rtl" ? "rtl" : "ltr",}}
                    >
                      <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                        <Card
                          style={{
                            borderRadius:
                              isRTL === "rtl"
                                ? "0 15px 15px 0"
                                : "15px 0 0 15px",
                            backgroundColor: MAIN_COLOR,
                            minHeight: 80,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            padding: 2,
                            boxShadow: `0px 2px 5px ${SECONDORY_COLOR}`,
                          }}
                        >
                          <Typography
                            style={{
                              color: colors.WHITE,
                              textAlign: "center",
                              fontSize: 16,
                            }}
                          >
                            {t("vehicle_model_name")}
                          </Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Card
                          style={{
                            borderRadius:
                              isRTL === "rtl"
                                ? "15px 0 0 15px "
                                : "0 15px 15px 0",
                            backgroundColor: colors.WHITE,
                            minHeight: 80,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            padding: 2,
                            boxShadow: `0px 2px 5px ${SECONDORY_COLOR}`,
                          }}
                        >
                          <Typography
                            style={{
                              color: colors.BLACK,
                              textAlign: "center",
                              fontSize: 18,
                              fontWeight: "bold",
                            }}
                          >
                            {activeCar?.vehicleMake}
                          </Typography>
                        </Card>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      spacing={1}
                      sx={{ direction:isRTL === "rtl" ? "rtl" : "ltr",}}
                    >
                      <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                        <Card
                          style={{
                            borderRadius:
                              isRTL === "rtl"
                                ? "0 15px 15px 0"
                                : "15px 0 0 15px",
                            backgroundColor: MAIN_COLOR,
                            minHeight: 80,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            padding: 2,
                            boxShadow: `0px 2px 5px ${SECONDORY_COLOR}`,
                          }}
                        >
                          <Typography
                            style={{
                              color: "white",
                              textAlign: "center",
                              fontSize: 16,
                            }}
                          >
                            {t("vehicle_model_no")}
                          </Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Card
                          style={{
                            borderRadius:
                              isRTL === "rtl"
                                ? "15px 0 0 15px "
                                : "0 15px 15px 0",
                            backgroundColor: colors.WHITE,
                            minHeight: 80,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            padding: 2,
                            boxShadow: `0px 2px 5px ${SECONDORY_COLOR}`,
                          }}
                        >
                          <Typography
                            style={{
                              color: "Black",
                              textAlign: "center",
                              fontSize: 18,
                              fontWeight: "bold",
                            }}
                          >
                            {activeCar?.vehicleModel}
                          </Typography>
                        </Card>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      spacing={1}
                      sx={{ direction:isRTL === "rtl" ? "rtl" : "ltr",}}
                    >
                      <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                        <Card
                          style={{
                            borderRadius:
                              isRTL === "rtl"
                                ? "0 15px 15px 0"
                                : "15px 0 0 15px",
                            backgroundColor: MAIN_COLOR,
                            minHeight: 80,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            padding: 10,
                            boxShadow: `0px 2px 5px ${SECONDORY_COLOR}`,
                          }}
                        >
                          <Typography
                            style={{
                              color: "white",
                              textAlign: "center",
                              fontSize: 16,
                            }}
                          >
                            {t("vehicle_no")}
                          </Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Card
                          style={{
                            borderRadius:
                              isRTL === "rtl"
                                ? "15px 0 0 15px "
                                : "0 15px 15px 0",
                            backgroundColor: colors.WHITE,
                            minHeight: 80,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            padding: 10,
                            boxShadow: `0px 2px 5px ${SECONDORY_COLOR}`,
                          }}
                        >
                          <Typography
                            style={{
                              color: "Black",
                              textAlign: "center",
                              fontSize: 18,
                              fontWeight: "bold",
                            }}
                          >
                            {activeCar?.vehicleNumber}
                          </Typography>
                        </Card>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      spacing={1}
                      sx={{ direction:isRTL === "rtl" ? "rtl" : "ltr",}}
                    >
                      <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                        <Card
                          style={{
                            borderRadius:
                              isRTL === "rtl"
                                ? "0 15px 15px 0"
                                : "15px 0 0 15px",
                            backgroundColor: MAIN_COLOR,
                            minHeight: 80,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            padding: 10,
                            boxShadow: `0px 2px 5px ${SECONDORY_COLOR}`,
                          }}
                        >
                          <Typography
                            style={{
                              color: "white",
                              textAlign: "center",
                              fontSize: 16,
                            }}
                          >
                            {t("other_info")}
                          </Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                        <Card
                          style={{
                            borderRadius:
                              isRTL === "rtl"
                                ? "15px 0 0 15px "
                                : "0 15px 15px 0",
                            backgroundColor: colors.WHITE,
                            minHeight: 80,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            padding: 10,
                            boxShadow: `0px 2px 5px ${SECONDORY_COLOR}`,
                          }}
                        >
                          <Typography
                            style={{
                              color: "Black",
                              textAlign: "center",
                              fontSize: 18,
                              fontWeight: "bold",
                            }}
                          >
                            {activeCar?.other_info}
                          </Typography>
                        </Card>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              ) : null}
            </Card>
          </>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <>
            <Card
              style={{
                borderRadius: "5px",
                backgroundColor: MAIN_COLOR,
                marginTop: 5,
                marginBottom: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h5"
                style={{
                  textAlign: "center",
                  color: "white",
                }}
              >
                {t("other_cars")}
              </Typography>
            </Card>

            <Card
              style={{
                borderRadius: "19px",
                backgroundColor: "#fff",
                minHeight: 100,
                padding: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 10,
                boxShadow: `0px 2px 5px ${SECONDORY_COLOR}`,
              }}
            >
              {otherCars?.map((item, idx) => (
                <div key={item.id} style={{ width: "90%", marginBottom: 50 }}>
                  <Card
                    style={{
                      borderRadius: "19px",
                      backgroundColor: "#fff",
                      width: "100%",
                      minHeight: 100,
                      padding: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0px 2px 5px ${SECONDORY_COLOR}`,
                    }}
                  >
                    <Grid container direction="column">
                      <Grid item>
                        <Grid container>
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={6}
                            xl={6}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {item?.car_image ? (
                              <Avatar
                                alt="Id Image"
                                src={item.car_image}
                                sx={{
                                  width: 250,
                                  height: 140,
                                  borderRadius: "19px",
                                }}
                                variant="square"
                              />
                            ) : (
                              <Avatar
                                sx={{ width: 460, height: 240 }}
                                variant="square"
                              >
                                Car Image
                              </Avatar>
                            )}
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={6}
                            xl={6}
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                              alignItems: "center",
                              marginTop: 5,
                            }}
                          >
                            <Card
                              style={{
                                borderRadius: "19px",
                                backgroundColor:
                                  activeCar?.approved === true
                                    ? colors.GREEN
                                    : colors.RED,
                                minWidth: "40%",
                                minHeight: 10,
                                padding: 10,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Typography
                                style={{
                                  fontSize: 14,
                                  textAlign: "center",
                                  color: "white",
                                }}
                              >
                                {item?.approved
                                  ? t("approved")
                                  : t("not_approved")}
                              </Typography>
                            </Card>
                            <Card
                              style={{
                                borderRadius: "19px",
                                backgroundColor: MAIN_COLOR,
                                minWidth: "40%",
                                minHeight: 10,
                                padding: 10,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Typography
                                style={{
                                  fontSize: 14,
                                  textAlign: "center",
                                  color: colors.WHITE,
                                }}
                              >
                                {item?.carType}
                              </Typography>
                            </Card>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        style={{
                          marginTop: 10,
                        }}
                      >
                        <Grid
                          container
                          spacing={1}
                          sx={{ direction:isRTL === "rtl" ? "rtl" : "ltr",}}
                        >
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Typography
                              style={{
                                color: "black",
                                textAlign: isRTL === "rtl" ? "right" : "left",
                                fontSize: 16,
                                padding:
                                  isRTL === "rtl" ? "0 20px 0 0" : "0 0 0 20px",
                              }}
                            >
                              {t("createdAt")}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Typography
                              style={{
                                color: "Black",
                                textAlign: "center",
                                fontSize: 18,
                                fontWeight: "bold",
                              }}
                            >
                              {item?.createdAt
                                ? moment(item?.createdAt).format("lll")
                                : null}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          spacing={1}
                          sx={{ direction:isRTL === "rtl" ? "rtl" : "ltr",}}
                        >
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Typography
                              style={{
                                color: "black",
                                textAlign: isRTL === "rtl" ? "right" : "left",
                                fontSize: 16,
                                padding:
                                  isRTL === "rtl" ? "0 20px 0 0" : "0 0 0 20px",
                              }}
                            >
                              {t("vehicle_model_name")}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Typography
                              style={{
                                color: "Black",
                                textAlign: "center",
                                fontSize: 18,
                                fontWeight: "bold",
                              }}
                            >
                              {item?.vehicleMake}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          spacing={1}
                          sx={{ direction:isRTL === "rtl" ? "rtl" : "ltr",}}
                        >
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Typography
                              style={{
                                color: "black",
                                textAlign: isRTL === "rtl" ? "right" : "left",
                                fontSize: 16,
                                padding:
                                  isRTL === "rtl" ? "0 20px 0 0" : "0 0 0 20px",
                              }}
                            >
                              {t("vehicle_model_no")}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Typography
                              style={{
                                color: "Black",
                                textAlign: "center",
                                fontSize: 18,
                                fontWeight: "bold",
                              }}
                            >
                              {item?.vehicleModel}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          spacing={1}
                          sx={{ direction:isRTL === "rtl" ? "rtl" : "ltr",}}
                        >
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Typography
                              style={{
                                color: "black",
                                textAlign: isRTL === "rtl" ? "right" : "left",
                                fontSize: 16,
                                padding:
                                  isRTL === "rtl" ? "0 20px 0 0" : "0 0 0 20px",
                              }}
                            >
                              {t("vehicle_no")}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Typography
                              style={{
                                color: "Black",
                                textAlign: "center",
                                fontSize: 18,
                                fontWeight: "bold",
                              }}
                            >
                              {item?.vehicleNumber}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          spacing={1}
                          sx={{ direction:isRTL === "rtl" ? "rtl" : "ltr",}}
                        >
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Typography
                              style={{
                                color: "black",
                                textAlign: isRTL === "rtl" ? "right" : "left",
                                fontSize: 16,
                                padding:
                                  isRTL === "rtl" ? "0 20px 0 0" : "0 0 0 20px",
                              }}
                            >
                              {t("other_info")}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Typography
                              style={{
                                color: "Black",
                                textAlign: "center",
                                fontSize: 18,
                                fontWeight: "bold",
                              }}
                            >
                              {item?.other_info}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Card>
                </div>
              ))}
            </Card>
          </>
        </Grid>
      </Grid>
    </>
  );
}

export default DriverCars;
