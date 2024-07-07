import React, { useContext, useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";
import MainRight from "./MainRight";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Paper,
  Divider,
  Button,
  Grid,
  Chip,
} from "@mui/material";
import { AccessTime } from "@mui/icons-material";

const CourseDetails = () => {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("id");
  const classId = searchParams.get("classID");
  console.log(classId, courseId)

  const { course, cls, slot, question, status, contentCourse } =
    useContext(DataContext);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentSlot, setCurrentSlot] = useState(null);
  const [content, setContent] = useState(null);
  const [currentClass, setCurrentClass] = useState(null);
  const [courseSlots, setCourseSlots] = useState([]);
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      if (!courseId || !classId) {
        setError("Invalid course or class ID");
        setLoading(false);
        return;
      }

      if (!course || !cls || !slot) {
        setError("Data is not available");
        setLoading(false);
        return;
      }

      const foundCourse = course.find((c) => c.id == courseId);
    //   const foundClass = cls.find((cl) => cl.id == classId);
      const foundClass = cls.filter((c) =>
        c.id.toString().includes(classId.toString())
      );

    //   if (!foundCourse || !foundClass) {
    //     setError("Course or class not found");
    //     setLoading(false);
    //     return;
    //   }

      const foundSlots = slot.filter((s) =>
        s.courseID.toString().includes(courseId.toString())
      );

      const foundContent = contentCourse.filter((c) =>
        c.courseID.toString().includes(courseId.toString())
      );

      setCurrentCourse(foundCourse);
      setCurrentClass(foundClass);
      setContent(foundContent);
      setCurrentSlot(foundSlots);
      setCourseSlots(foundSlots);
      setLoading(false);
    };

    fetchData();
  }, [courseId, classId, course, cls, slot]);

  console.log(content)
  console.log(courseSlots)
  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!currentCourse || !currentClass) {
    return <Typography>No data available for this course.</Typography>;
  }

  const questions = question
    ? question.filter((q) => courseSlots.some((s) => s.id === q.slotID))
    : [];

  return (
    <>
      <div>
        <div className="fixed top-[10px] right-[30px]">
          <p style={{ fontSize: ".625rem" }}>APHL</p>
        </div>
        <div className="flex sticky">
          <MainRight />
          <div className="w-full h-screen">
            <div className="grow p-[20px]">
              <Box sx={{ width: "100%", padding: 3 }}>
                <Typography variant="h5" gutterBottom>
                  <Link to="/homepage" style={{ color: "blue" }}>
                    Home
                  </Link>{" "}
                  / {currentCourse.title} ↔ {currentCourse.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    border: "1px solid #ccc",
                    borderRadius: 1,
                    p: 2,
                    mb: 3,
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column", mr: 2 }}>
                    <Typography>Filter activities</Typography>
                    <select
                      className="filter-activities"
                      style={{ padding: "5px", marginTop: "5px" }}
                    >
                      <option value="all">All Activities</option>
                      {status.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.statusName}
                        </option>
                      ))}
                    </select>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", mr: 2 }}>
                    <Typography>Jump slot</Typography>
                    <select
                      className="jump-slot"
                      style={{ padding: "5px", marginTop: "5px" }}
                    >
                      {/* <option value="slot5">Slot:</option> */}
                      {courseSlots.map((slot) => (
                        <option key={slot.id} value={slot.id}>
                          Slot {slot.id}
                        </option>
                      ))}
                    </select>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", mr: 2 }}>
                    <Typography>Class name</Typography>
                    <select
                      className="class-name"
                      style={{ padding: "5px", marginTop: "5px" }}
                    >
                      {currentClass.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </Box>

                  <Box sx={{ display: "flex", gap: 2, ml: "auto" }}>
                    <Button variant="contained" color="primary">
                      LEARNING MATERIALS
                    </Button>
                    <Button variant="contained" color="primary">
                      ASSIGNMENTS
                    </Button>
                  </Box>
                </Box>
                TEACHERS: TRUNGNT@FPT.EDU.VN
                {courseSlots.map((slot) => (
                  <Paper
                    key={slot.id}
                    sx={{ mb: 2, p: 2, position: "relative" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Chip label={`Slot ${slot.id}`} color="primary" />
                      <Button
                        variant="text"
                        sx={{ position: "absolute", top: 8, right: 8 }}
                      >
                        View slot
                      </Button>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <AccessTime fontSize="small" />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {`${slot.startDate} - ${slot.endDate}`}
                      </Typography>
                    </Box>
                    <Box sx={{ my: 1 }}>
                      {content
                        .filter((c) => c.slot === slot.id)
                        .map((c) => (
                          <div key={c.id}>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: "bold" }}
                            >
                              {c.content}
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                          </div>
                        ))}
                    </Box>
                    {questions
                      .filter((q) => q.slotID === slot.id)
                      .map((q) => (
                        <Typography key={q.id} variant="body2">
                          {q.title}
                        </Typography>
                      ))}
                  </Paper>
                ))}
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
