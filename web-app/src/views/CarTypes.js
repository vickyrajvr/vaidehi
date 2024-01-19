import React, { useState, useEffect, useRef } from "react";
import MaterialTable from "material-table";
import { useSelector, useDispatch } from "react-redux";
import CircularLoading from "../components/CircularLoading";
import { api } from "common";
import PhotoSizeSelectSmallIcon from "@mui/icons-material/PhotoSizeSelectSmall";
import { makeStyles } from "@mui/styles";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Modal, Grid, Typography } from "@mui/material";
import Button from "components/CustomButtons/Button.js";
import CancelIcon from "@mui/icons-material/Cancel";
import AlertDialog from "../components/AlertDialog";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import { colors } from "../components/Theme/WebTheme";
import { carTypeColumns, optionsRequired } from "common/sharedFunctions";
import { SECONDORY_COLOR } from "../common/sharedFunctions";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  submit3: {
    width: "100%",
    borderRadius: 3,
    marginTop: 2,
    padding: 4,
  },
  paper: {
    width: 700,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function CarTypes() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir();
  const settings = useSelector((state) => state.settingsdata.settings);
  const { editCarType } = api;
  const [data, setData] = useState([]);
  const cartypes = useSelector((state) => state.cartypes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rootRef = useRef(null);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [rowIndex, setRowIndex] = useState();
  const [modalType, setModalType] = useState();

  const onClick = (rowData) => {
    setImageData(rowData.image);
    setProfileModal(true);
    setUserData(rowData);
  };

  const columns = carTypeColumns(t, isRTL, onClick);
  const subcolumns = [
    {
      title: t("description"),
      field: "description",
      render: (rowData) => <span>{rowData.description}</span>,
    },
    { title: t("amount"), field: "amount", type: "numeric" },
  ];

  const subcolumns2 = [
    {
      title: t("minsDelayed"),
      field: "minsDelayed",
      render: (rowData) => <span>{rowData.minsDelayed}</span>,
    },
    { title: t("amount"), field: "amount", type: "numeric" },
  ];

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (cartypes.cars) {
      setData(cartypes.cars);
    } else {
      setData([]);
    }
  }, [cartypes.cars]);

  const [selectedImage, setSelectedImage] = useState(null);
  const handleProfileModal = (e) => {
    setProfileModal(false);
    setSelectedImage(null);
  };

  const [userData, setUserData] = useState();
  const [profileModal, setProfileModal] = useState(false);
  const [imageData, setImageData] = useState(false);
  const [commonAlert, setCommonAlert] = useState({ open: false, msg: "" });
  const [loading, setLoading] = useState(false);

  const handleCommonAlertClose = (e) => {
    e.preventDefault();
    setCommonAlert({ open: false, msg: "" });
  };

  const handleSetProfileModal = (e) => {
    e.preventDefault();
    if (selectedImage) {
      setLoading(true);
      let finalData = userData;
      finalData.image = selectedImage;
      dispatch(editCarType(finalData, "UpdateImage"));
      setProfileModal(false);
      setTimeout(() => {
        setSelectedImage(null);
        setLoading(false);
      }, 10000);
    } else {
      setCommonAlert({ open: true, msg: t("choose_image_first") });
    }
  };

  const [selectedRow, setSelectedRow] = useState(null);
  return cartypes.loading ? (
    <CircularLoading />
  ) : (
    <div ref={rootRef}>
      <MaterialTable
        title={t("car_type_title")}
        columns={columns}
        style={{
          direction: isRTL === "rtl" ? "rtl" : "ltr",
          borderRadius: "8px",
          boxShadow: `0px 2px 5px ${SECONDORY_COLOR}`,
          border: "1px solid rgba(224, 224, 224, 1)",
        }}
        data={data}
        onRowClick={(evt, selectedRow) =>
          setSelectedRow(selectedRow.tableData.id)
        }
        options={{
          pageSize: 10,
          pageSizeOptions: [10, 15, 20],
          exportButton: true,
          rowStyle: (rowData) => ({
            backgroundColor:
              selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
            border: "1px solid rgba(224, 224, 224, 1)",
          }),
          editable: {
            backgroundColor: colors.Header_Text,
            fontSize: "0.8em",
            fontWeight: "bold ",
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          },
          headerStyle: {
            position: "sticky",
            top: "0px",
            fontSize: "0.8em",
            fontWeight: "bold ",
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            color: colors.BLACK,
            backgroundColor: SECONDORY_COLOR,
            textAlign: "center",
            border: "1px solid rgba(224, 224, 224, 1)",
          },
          cellStyle: {
            border: "1px solid rgba(224, 224, 224, 1)",
            textAlign: "center",
          },
          actionsColumnIndex: -1,
        }}
        localization={{
          body: {
            addTooltip: t("add"),
            deleteTooltip: t("delete"),
            editTooltip: t("edit"),
            emptyDataSourceMessage: t("blank_message"),
            editRow: {
              deleteText: t("delete_message"),
              cancelTooltip: t("cancel"),
              saveTooltip: t("save"),
            },
          },
          toolbar: {
            searchPlaceholder: t("search"),
            exportTitle: t("export"),
          },
          header: {
            actions: t("actions"),
          },
          pagination: {
            labelDisplayedRows: "{from}-{to} " + t("of") + " {count}",
            firstTooltip: t("first_page_tooltip"),
            previousTooltip: t("previous_page_tooltip"),
            nextTooltip: t("next_page_tooltip"),
            lastTooltip: t("last_page_tooltip"),
          },
        }}
        editable={{
          onRowDelete: (oldData) =>
            settings.AllowCriticalEditsAdmin
              ? new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    dispatch(editCarType(oldData, "Delete"));
                  }, 600);
                })
              : new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    alert(t("demo_mode"));
                  }, 600);
                }),
        }}
        actions={[
          (rowData) =>
            optionsRequired
              ? {
                  icon: () => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        width: "135px",
                        maxWidth: "200px",
                      }}
                    >
                      <PhotoSizeSelectSmallIcon />
                      <Typography variant="subtitle2" style={{ padding: 5 }}>
                        {t("parcel_types")}
                      </Typography>
                    </div>
                  ),
                  onClick: (event, rowData) => {
                    setModalType("parcelTypes");
                    setRowIndex(rowData.tableData.id);
                    setOpen(true);
                  },
                }
              : null,
          (rowData) =>
            optionsRequired
              ? {
                  icon: () => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        width: "95px",
                        maxWidth: "150px",
                      }}
                    >
                      <FitnessCenterIcon />
                      <Typography variant="subtitle2" style={{ padding: 5 }}>
                        {t("options")}
                      </Typography>
                    </div>
                  ),
                  onClick: (event, rowData) => {
                    setModalType("options");
                    setRowIndex(rowData.tableData.id);
                    setOpen(true);
                  },
                }
              : null,
          (rowData) => ({
            icon: () => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  width: "155px",
                  maxWidth: "200px",
                }}
              >
                <CancelScheduleSendIcon />
                <Typography variant="subtitle2" style={{ padding: 5 }}>
                  {t("cancelSlab")}
                </Typography>
              </div>
            ),
            onClick: (event, rowData) => {
              setModalType("cancelSlab");
              setRowIndex(rowData.tableData.id);
              setOpen(true);
            },
          }),
          {
            icon: "add",
            tooltip: t("add_carType"),
            isFreeAction: true,
            onClick: (event) => navigate("/cartypes/addcartype"),
          },
          {
            icon: "edit",
            tooltip: t("edit"),
            onClick: (event, rowData) => {
              navigate(`/cartypes/updatecartypes/${rowData.id}`);
            },
          },
        ]}
      />
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={profileModal}
        onClose={handleProfileModal}
        className={classes.modal}
        container={() => rootRef.current}
      >
        <Grid
          container
          spacing={1}
          className={classes.paper}
          style={{ direction: isRTL === "rtl" ? "rtl" : "ltr" }}
        >
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography component="h1" variant="h6">
              {t("upload_car_image")}

              <input
                type="file"
                style={{ marginLeft: 10 }}
                name={t("image")}
                onChange={(event) => {
                  setSelectedImage(event.target.files[0]);
                }}
              />
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {selectedImage && !loading ? (
              <Tooltip title={t("cancel")}>
                <CancelIcon
                  onClick={() => setSelectedImage(null)}
                  style={{
                    fontSize: 30,
                    backgroundColor: "red",
                    borderRadius: 50,
                    color: "white",
                  }}
                />
              </Tooltip>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {selectedImage ? (
              <img
                alt="not fount"
                width={"200px"}
                height={"200px"}
                src={URL.createObjectURL(selectedImage)}
                style={{ marginTop: 15, marginBottom: 20 }}
              />
            ) : (
              <img
                alt="not fount"
                width={"200px"}
                height={"200px"}
                src={imageData}
                style={{ marginTop: 10 }}
              />
            )}
            <br />
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{ textAlign: isRTL === "rtl" ? "right" : "left" }}
          >
            {loading ? (
              <Grid
                container
                spacing={0}
                alignItems="center"
                justify="center"
                style={{ minHeight: "5vh" }}
              >
                <CircularProgress />
              </Grid>
            ) : (
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                style={{ textAlign: isRTL === "rtl" ? "right" : "left" }}
              >
                <Button
                  onClick={handleProfileModal}
                  variant="contained"
                  style={{ backgroundColor:colors.RED }}
                >
                  {t("cancel")}
                </Button>
                <Button
                  onClick={handleSetProfileModal}
                  variant="contained"
                  style={{ marginLeft: 10, backgroundColor:colors.GREEN }}
                >
                  {t("save")}
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Modal>
      <AlertDialog open={commonAlert.open} onClose={handleCommonAlertClose}>
        {commonAlert.msg}
      </AlertDialog>
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        onClose={handleClose}
        open={open}
        className={classes.modal}
        container={() => rootRef.current}
      >
        <div className={classes.paper}>
          <MaterialTable
            title={
              modalType === "options"
                ? t("options")
                : modalType === "cancelSlab"
                ? t("cancelSlab")
                : t("parcel_types")
            }
            columns={modalType === "cancelSlab" ? subcolumns2 : subcolumns}
            data={
              data[rowIndex] && data[rowIndex][modalType]
                ? data[rowIndex][modalType]
                : []
            }
            options={{
              exportButton: true,
            }}
            editable={{
              onRowAdd: (newData) =>
                settings.AllowCriticalEditsAdmin
                  ? new Promise((resolve) => {
                      setTimeout(() => {
                        resolve();
                        let tblData = data;
                        if (!tblData[rowIndex][modalType]) {
                          tblData[rowIndex][modalType] = [];
                        }
                        tblData[rowIndex][modalType].push(newData);
                        dispatch(editCarType(tblData[rowIndex]), "Update");
                      }, 600);
                    })
                  : new Promise((resolve) => {
                      setTimeout(() => {
                        resolve();
                        alert(t("demo_mode"));
                      }, 600);
                    }),
              onRowUpdate: (newData, oldData) =>
                settings.AllowCriticalEditsAdmin
                  ? new Promise((resolve) => {
                      setTimeout(() => {
                        resolve();
                        if (newData !== oldData) {
                          let tblData = data;
                          tblData[rowIndex][modalType][oldData.tableData.id] =
                            newData;
                          dispatch(editCarType(tblData[rowIndex]), "Update");
                        }
                      }, 600);
                    })
                  : new Promise((resolve) => {
                      setTimeout(() => {
                        resolve();
                        alert(t("demo_mode"));
                      }, 600);
                    }),
              onRowDelete: (oldData) =>
                settings.AllowCriticalEditsAdmin
                  ? new Promise((resolve) => {
                      setTimeout(() => {
                        resolve();
                        let tblData = data;
                        const index = tblData[rowIndex][modalType];
                        const neTtblData = index.filter(
                          (item) =>
                            item.amount !== oldData.amount &&
                            (modalType === "cancelSlab"
                              ? item.minsDelayed !== oldData.minsDelayed
                              : item.description !== oldData.description)
                        );
                        tblData[rowIndex][modalType] = neTtblData;
                        dispatch(editCarType(tblData[rowIndex]), "Update");
                      }, 600);
                    })
                  : new Promise((resolve) => {
                      setTimeout(() => {
                        resolve();
                        alert(t("demo_mode"));
                      }, 600);
                    }),
            }}
          />
        </div>
      </Modal>
    </div>
  );
}
