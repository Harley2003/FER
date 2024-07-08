import React from "react";
import MainRight from "./MainRight";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  FaBook,
  FaChalkboardTeacher,
  FaClock,
  FaArrowRight
} from "react-icons/fa";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";

const successColor = {
  position: "fixed",
  bottom: "30px",
  fontSize: "12px",
  right: "10px",
  zIndex: "10000",
  color: "#38cb89"
};

const renderCard = (lab, slot, course, className, dueDate) => (
  <Grid item xs={6} sm={4} md={3} key={slot}>
    <Box>
      <Card variant="outlined" sx={{ margin: 1 }}>
        <CardContent sx={{ padding: 1 }}>
          <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
            {lab}
          </Typography>
          <Typography variant="h6" component="div">
            Slot: {slot}
          </Typography>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            <FaBook
              style={{
                verticalAlign: "middle",
                marginRight: "2px",
                fontSize: "12px"
              }}
            />{" "}
            {course}
          </Typography>
          <Typography variant="body2">
            <FaChalkboardTeacher
              style={{
                verticalAlign: "middle",
                marginRight: "2px",
                fontSize: "12px"
              }}
            />
            Class: {className}
          </Typography>
          <Typography variant="body2">
            <FaClock
              style={{
                verticalAlign: "middle",
                marginRight: "2px",
                fontSize: "12px"
              }}
            />
            Due date: {dueDate}
          </Typography>
        </CardContent>
        <CardActions sx={{ padding: 1 }}>
          <Button size="small" aria-label="View assignment">
            View assignment
            <FaArrowRight style={{ marginLeft: "2px", fontSize: "12px" }} />
          </Button>
        </CardActions>
      </Card>
    </Box>
  </Grid>
);

const Assignment = () => {
  return (
    <>
      <CssBaseline />
      <div>
        <div className="fixed top-[10px] right-[30px]">
          <p style={{ fontSize: ".625rem" }}>APHL</p>
        </div>
        <div className="flex sticky">
          <MainRight />
          <div className="w-full h-screen">
            <div className="grow p-[20px]">
              <div className="container-fluid ml-[130px]">
                <Grid container spacing={1}>
                  {[...Array(12)].map((_, index) =>
                    renderCard(
                      "Lab4",
                      13 + index,
                      "OSG202 ↔ [SUMMER2023]",
                      "SE1830",
                      "00:00 27/06/2023 (GMT+07)"
                    )
                  )}
                </Grid>
              </div>
            </div>
            <span style={successColor}>Online: 10442</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Assignment;
