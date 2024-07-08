import React, { useContext, useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { FaChalkboardTeacher, FaArrowRight } from "react-icons/fa";
import { LiaIdCardSolid, LiaUserCircleSolid } from "react-icons/lia";
import boxNoData from "../../assets/images/box-no-data-KZXFWQlG.png";
import { DataContext } from "../../contexts/DataContext";
import { toast } from "react-toastify";

function CustomTabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

const badgeStyle = {
  width: "30px",
  height: "30px",
  display: "flex",
  color: "#0078d4",
  marginLeft: "auto",
  background: "#fff",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "2px 1px 5px rgba(0, 0, 0, 0.2)",
  borderRadius: "5px",
  fontSize: "0.8em",
  position: "relative",
  zIndex: "1"
};

const Home = () => {
  const { semester, course, selected, setSelected, cls, account } =
    useContext(DataContext);

  const [tab, setTab] = useState(0);
  const [semesterTmp, setSemesterTmp] = useState("");

  useEffect(() => {
    if (semester.length > 0) {
      const latestSemester = semester[semester.length - 1];
      setSelected(latestSemester.id);
      setSemesterTmp(latestSemester.name);
    }
  }, [semester, setSelected]);

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  const handleChangeSelect = (event) => {
    setSelected(event.target.value);
  };

  const handleChangeSemester = (event) => {
    setSemesterTmp(event.target.value);
  };

  const filteredCourses = course.filter((cour) => cour.semesterID === selected);

  const handleFormSubmit = () => {
    if (!selected) {
      toast.error("Please select a semester.");
      return;
    }
  };

  return (
    <>
      <CssBaseline />
      <div className="container-fluid ml-[250px]">
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={tab}
            onChange={handleChangeTab}
            sx={{ borderColor: "divider" }}
          >
            <Tab label="COURSE" />
            <Tab label="PROJECT" />
          </Tabs>
          <CustomTabPanel value={tab} index={0}>
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4} lg={1.8}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="semester-label">SEMESTER</InputLabel>
                    <Select
                      labelId="semester-label"
                      id="semester-select"
                      value={selected}
                      onChange={handleChangeSelect}
                      label="SEMESTER"
                    >
                      {semester.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    {filteredCourses.length > 0 ? (
                      filteredCourses.map((cour) => (
                        <Grid key={cour.id} item xs={12} sm={6} md={4} lg={2.5}>
                          <Card
                            variant="outlined"
                            sx={{ height: "210px", width: "auto" }}
                          >
                            <CardContent>
                              <Link
                                to={`/course?id=${cour.id}&classID=${cour.classID}`}
                                style={{
                                  textDecoration: "none",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap"
                                }}
                              >
                                <Typography
                                  variant="body1"
                                  component="div"
                                  sx={{
                                    fontWeight: "bold",
                                    ":hover": { color: "blue" },
                                    color: "inherit",
                                    mb: 1,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap"
                                  }}
                                >
                                  {`(${cour.title} ↔ [${
                                    semester.find(
                                      (s) => s.id === cour.semesterID
                                    )?.name
                                  }])`}
                                  <p></p>
                                  {cour.name}
                                </Typography>
                              </Link>
                              <Typography
                                variant="body2"
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  mt: 1,
                                  mb: 1
                                }}
                              >
                                <FaChalkboardTeacher
                                  style={{ marginRight: 8 }}
                                />
                                {
                                  cls.find((clss) => clss.id === cour.classID)
                                    ?.name
                                }
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  mb: 1
                                }}
                              >
                                <LiaUserCircleSolid
                                  style={{ marginRight: 8 }}
                                />
                                edu_next_ltr_fpt_edu_02
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <LiaIdCardSolid style={{ marginRight: 8 }} />
                                Number of students:{" "}
                                {
                                  account.filter(
                                    (acc) =>
                                      acc.classID.includes(cour.classID) &&
                                      acc.roleID === 1
                                  ).length
                                }
                              </Typography>
                            </CardContent>
                            <CardActions
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                              }}
                            >
                              <Link
                                to={`/course?id=${cour.id}&classID=${cour.classID}`}
                                style={{ textDecoration: "none" }}
                              >
                                <Button size="small" endIcon={<FaArrowRight />}>
                                  Go to course
                                </Button>
                              </Link>
                              <div style={badgeStyle}>{account.length}</div>
                            </CardActions>
                          </Card>
                        </Grid>
                      ))
                    ) : (
                      <Grid
                        container
                        spacing={3}
                        justifyContent="center"
                        alignItems="center"
                        style={{ marginTop: "10px" }}
                      >
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          lg={12}
                          textAlign="center"
                        >
                          <img
                            src={boxNoData}
                            alt="No data"
                            style={{
                              marginLeft: "35rem",
                              width: "15%",
                              height: "auto"
                            }}
                          />
                          <div
                            style={{
                              textAlign: "center",
                              marginTop: "10px",
                              marginRight: "11.5rem"
                            }}
                          >
                            <Typography
                              variant="h6"
                              color="primary"
                              gutterBottom
                              sx={{ fontWeight: "bold", color: "#0078d4" }}
                            >
                              No data available.
                            </Typography>
                            <Typography variant="body1" color="black">
                              Please contact your school administration for more
                              information.
                            </Typography>
                          </div>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={tab} index={1}>
            <Box sx={{ p: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4} lg={1.8}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="semester-label">SEMESTER</InputLabel>
                    <Select
                      labelId="semester-label"
                      id="semester-select"
                      value={semesterTmp}
                      onChange={handleChangeSemester}
                      label="SEMESTER"
                    >
                      {semester.map((item) => (
                        <MenuItem key={item.id} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  container
                  spacing={3}
                  justifyContent="center"
                  alignItems="center"
                  style={{ marginTop: "10px" }}
                >
                  <Grid item xs={12} sm={6} md={4} lg={12} textAlign="center">
                    <img
                      src={boxNoData}
                      alt="No data"
                      style={{
                        marginLeft: "35rem",
                        width: "15%",
                        height: "auto"
                      }}
                    />
                    <div
                      style={{
                        textAlign: "center",
                        marginTop: "10px",
                        marginRight: "11.5rem"
                      }}
                    >
                      <Typography
                        variant="h6"
                        color="primary"
                        gutterBottom
                        sx={{ fontWeight: "bold", color: "#0078d4" }}
                      >
                        No data available.
                      </Typography>
                      <Typography variant="body1" color="black">
                        Please contact your school administration for more
                        information.
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </CustomTabPanel>
        </Box>
      </div>
    </>
  );
};

export default Home;
