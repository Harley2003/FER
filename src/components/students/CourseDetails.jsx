import React, { useContext, useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";
import MainRight from "./MainRight";
import {
  Box,
  Typography,
  CircularProgress,
  Divider,
  Button,
  Paper,
  Chip,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import { AccessTime } from "@mui/icons-material";

const CourseDetails = () => {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("id");
  const classId = searchParams.get("classID");

  const { course, cls, slot, question, status, contentCourse, account } =
    useContext(DataContext);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentSlot, setCurrentSlot] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [content, setContent] = useState(null);
  const [currentClass, setCurrentClass] = useState(null);
  const [courseSlots, setCourseSlots] = useState([]);
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;
const [selectedJumpSlot, setSelectedJumpSlot] = useState("");
const [expandedSlot, setExpandedSlot] = useState(null);

console.log(question);

const handleSlotClick = (slotId) => {
  setExpandedSlot(expandedSlot === slotId ? null : slotId);
};

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
      const foundClass = cls.filter((c) =>
        c.id.toString().includes(classId.toString())
      );
      setCurrentClass(foundClass);

      const foundSlots = slot.filter((s) =>
        s.courseID.toString().includes(courseId.toString())
      );

      const foundContent = contentCourse.filter((c) =>
        c.courseID.toString().includes(courseId.toString())
      );

      const foundTeacher = account.filter(
        (a) => a.roleID === 2 && a.id === foundCourse.accountID
      );

      setTeacher(foundTeacher);
      setCurrentCourse(foundCourse);
      setContent(foundContent);
      setCurrentSlot(foundSlots);
      setCourseSlots(foundSlots);
      setLoading(false);
    };

    fetchData();
  }, [courseId, classId, course, cls, slot]);

  useEffect(() => {
    // Update default value for Jump slot when currentPage changes
    if (courseSlots.length > 0) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      setSelectedJumpSlot(courseSlots[startIndex]?.id || "");
    }
  }, [currentPage, courseSlots, itemsPerPage]);

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  const handleViewSlot = (e, slotId) => {
    e.stopPropagation(); // Prevent triggering the slot expansion
    navigate(`/session/detail?classId=${classId}&classroomSessionId=${slotId}`);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
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

  const displayedSlots = courseSlots.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      {/* Header */}
      <div className="fixed top-[10px] right-[30px]">
        <p style={{ fontSize: ".625rem" }}>APHL</p>
      </div>

      {/* Main Content */}
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
                  <Select
                    className="filter-activities"
                    style={{ padding: "5px", marginTop: "5px" }}
                    defaultValue="all"
                  >
                    <MenuItem value="all">All Activities</MenuItem>
                    {status.map((s) => (
                      <MenuItem key={s.id} value={s.id}>
                        {s.statusName}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", mr: 2 }}>
                  <Typography>Jump slot</Typography>
                  <Select
                    className="jump-slot"
                    style={{ padding: "5px", marginTop: "5px" }}
                    value={selectedJumpSlot}
                    onChange={(e) => setSelectedJumpSlot(e.target.value)}
                  >
                    {displayedSlots.map((slot) => (
                      <MenuItem key={slot.id} value={slot.id}>
                        Slot: {slot.id}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", mr: 2 }}>
                  <Typography>Class name</Typography>
                  <Select
                    className="class-name"
                    style={{ padding: "5px", marginTop: "5px" }}
                    defaultValue={
                      currentClass.length > 0 ? currentClass[0].id : ""
                    }
                  >
                    {currentClass.map((c) => (
                      <MenuItem key={c.id} value={c.id}>
                        {c.name}
                      </MenuItem>
                    ))}
                  </Select>
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
              {Array.isArray(teacher) && teacher.length > 0 ? (
                teacher.map((t) => (
                  <div key={t.id}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      Teacher: {t.email}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                  </div>
                ))
              ) : (
                <Typography variant="subtitle1">
                  No teachers available
                </Typography>
              )}
              <div className="grow p-[20px]">
                <Box sx={{ width: "100%", padding: 3 }}>
                  {/* ... other JSX */}
                  {displayedSlots.map((slot) => (
                    <Paper
                      key={slot.id}
                      sx={{
                        mb: 2,
                        p: 2,
                        position: "relative",
                        cursor: "pointer",
                      }}
                      onClick={() => handleSlotClick(slot.id)}
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
                          onClick={(e) => handleViewSlot(e, slot.id)}
                        >
                          View slot
                        </Button>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mt: 1 }}
                      >
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
                      {expandedSlot === slot.id && (
                        <Box sx={{ mt: 2 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold", mb: 1 }}
                          >
                            QUESTION
                          </Typography>
                          {questions
                            .filter((q) => q.slotID === slot.id)
                            .map((q) => (
                              <Box
                                key={q.id}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  mb: 1,
                                }}
                              >
                                <Box
                                  component="span"
                                  sx={{
                                    width: 24,
                                    height: 24,
                                    backgroundColor: "orange",
                                    borderRadius: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    mr: 1,
                                  }}
                                >
                                  <Typography
                                    variant="body2"
                                    sx={{ color: "white" }}
                                  >
                                    Q
                                  </Typography>
                                </Box>
                                <Typography
                                  variant="body2"
                                  sx={{ flexGrow: 1 }}
                                >
                                  {q.title}
                                </Typography>
                                <Chip
                                  label="Custom"
                                  color="error"
                                  size="small"
                                  sx={{ mr: 1 }}
                                />
                                <Chip
                                  label="Finished"
                                  color="success"
                                  size="small"
                                />
                              </Box>
                            ))}
                        </Box>
                      )}
                    </Paper>
                  ))}
                </Box>
              </div>
            </Box>
          </div>
        </div>
      </div>
      <div className="fixed bottom-[10px] left-[50%] transform [-translate-x-1/2]">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 3,
            backgroundColor: "#fff",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Pagination
            count={Math.ceil(courseSlots.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>
      </div>
    </>
  );
};

export default CourseDetails;
