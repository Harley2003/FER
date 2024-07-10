// Trong file Navigation.js
import React from "react";
import { Link, useParams } from "react-router-dom";
import MainRight from "./MainRight";
import { DataContext } from "../../contexts/DataContext";
import { useContext, useState, useEffect } from "react";
import Apiservice from "../../services/ApiService";
import axios from "axios";

const fontStyle = {
  fontFamily: "inherit"
};

const contentStyles = {
  width: "50%",
  paddingTop: "40px",
  marginLeft: "17%"
};

const navStyles = {
  position: "fixed",
  top: "10px",
  left: "39%",
  transform: "translateX(-50%)"
};

const ulStyles = {
  listStyle: "none",
  display: "flex",
  justifyContent: "space-between"
};

const slashStyles = {
  marginLeft: "5px",
  marginRight: "5px"
};

const linkStyles = {
  textDecoration: "none",
  color: "#0d6efd"
};

const linkedStyles = {
  textDecoration: "none",
  color: "black"
};

const titleStyles = {
  fontWeight: "600",
  fontSize: "1.5rem"
};

const boxStyle = {
  boxSizing: "border-box",
  color: "rgb(33, 37, 41)",
  display: "block",
  fontFamily: '"Be Vietnam Pro", sans-serif',
  fontSize: "16px",
  fontWeight: 400,
  height: "119.609px",
  lineHeight: "24px",
  paddingBottom: "20px",
  textAlign: "start",
  textSizeAdjust: "100%",
  unicodeBidi: "isolate",
  width: "872px",
  border: "2px solid rgba(0, 0, 0, 0.1)",
  borderRadius: "10px",
  backgroundColor: "rgba(0, 0, 0, 0.03)"
};

const h3_boxStyle = {
  fontFamily: '"Be Vietnam Pro", sans-serif',
  fontSize: "20px",
  fontWeight: 550,
  lineHeight: "24px",
  paddingBottom: "20px",
  textAlign: "start",
  textSizeAdjust: "100%",
  unicodeBidi: "isolate",
  width: "872px"
};

const content_boxStyle = {
  padding: "20px"
};

const navStyles1 = {
  marginTop: "40px",
  marginLeft: "60%",
  width: "872px",
  top: "0",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex"
};

const linkStyles1 = {
  marginLeft: "16px",
  textDecoration: "none",
  color: "gray"
};

const activeLinkStyles = {
  borderBottom: "2px solid rgb(25, 118, 210)",
  color: "rgb(25, 118, 210)",
  fontWeight: "bold"
};

const rightStyles = {
  marginTop: "70px"
};

const rightTitle = {
  fontSize: "18px",
  lineHeight: "36px",
  fontWeight: "bold"
};

const rightReport = {
  fontSize: "14px",
  lineHeight: "36px",
  fontStyle: "italic",
  color: "red"
};

const buttonRight = {
  backgroundColor: "rgb(25, 118, 210)",
  fontSize: "16px",
  color: "white",
  padding: "8px 160px",
  borderRadius: "6px",
  marginBottom: "40px"
};

const buttonRight1 = {
  backgroundColor: "rgb(25, 118, 210)",
  fontSize: "16px",
  color: "white",
  padding: "8px 90px",
  borderRadius: "6px",
  marginBottom: "40px"
};
const buttonRight2 = {
  backgroundColor: "white",
  fontSize: "16px",
  color: "rgb(25, 118, 210)",
  padding: "8px",
  borderRadius: "6px",
  border: "2px solid rgba(25, 118, 210,0.4)",
  marginBottom: "40px"
};

const buttonRight3 = {
  display: "flex",
  backgroundColor: "white",
  width: "312px",
  height: "60px",
  fontSize: "16px",
  color: "black",
  border: "2px solid rgba(0, 0, 0,0.04)",
  marginBottom: "40px"
};

const discussdivStyle = {
  marginTop: "40px",
  marginLeft: "46%",
  width: "872px",
  top: "0",
  left: "50%",
  transform: "translateX(-50%)",
  height: "200px"
};

const discussStyle = {
  width: "100%",
  height: "150px",
  padding: "12px 20px",
  boxSizing: "border-box",
  border: "2px solid #ccc",
  borderRadius: "4px",
  backgroundColor: "black",
  color: "white",
  resize: "none"
};

const sendButton = {
  width: "80px",
  height: "40px",
  backgroundColor: "rgb(25, 118, 210)",
  fontSize: "16px",
  color: "white",
  borderRadius: "6px",
  marginLeft: "91%",
  marginTop: "12px"
};

const accountNameInCommentStyle = {
  fontSize: "16px",
  lineHeight: "24px",
  fontWeight: "600"
};

const divCommentStyle = {
  backgroundColor: "rgb(242, 245, 247)",
  lineHeight: "24px",
  width: "872px",
  borderRadius: "4px",
  padding: "10px"
};

const commentStyle = {
  fontSize: "16px",
  lineHeight: "24px",
  fontWeight: "400"
};

const DetailQuestion = () => {
  const { cid, sid, qid } = useParams();

  const [account, setAccount] = useState(() => {
    const savedAccounts = sessionStorage.getItem("account");
    return savedAccounts ? JSON.parse(savedAccounts) : [];
  });
  const [currentCourse, setCurrentCourse] = useState("");
  const [currentSlot, setCurrentSlot] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [questionsInSlot, setQuestionsInSlot] = useState([]);
  const [commentsInQuestion, setCommentsInQuestion] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const currentAccountId = JSON.parse(localStorage.getItem("Account")).id;

  const fetchAccountInQuestion = async () => {
    try {
      console.log("Fetching account data...");
      const response = await Apiservice.getListAccount();
      if (Array.isArray(response)) {
        setAccount(response);
        sessionStorage.setItem("account", JSON.stringify(response));
      } else {
        console.error("Response is not an array:", response);
      }
      // console.log("API Response:", account);
    } catch (error) {
      console.error("Error fetching Account:", error);
    }
  };

  const fetchCurrentCourse = async () => {
    try {
      const response = await Apiservice.getCourseById(cid);
      setCurrentCourse(response);
    } catch (error) {
      console.error("Error fetching Course:", error);
    }
  };
  const fetchCurrentSlot = async () => {
    try {
      const response = await Apiservice.getSlotById(sid);
      setCurrentSlot(response);
    } catch (error) {
      console.error("Error fetching Slot:", error);
    }
  };
  const fetchCurrentQuestion = async () => {
    try {
      const response = await Apiservice.getQuestionById(qid);
      setCurrentQuestion(response);
    } catch (error) {
      console.error("Error fetching Question:", error);
    }
  };

  const fetchQuestionsInSlot = async () => {
    try {
      const response = await Apiservice.getListQuestion();
      setQuestionsInSlot(response.filter((ques) => ques.slotID == sid));
    } catch (error) {
      console.error("Error fetching Question:", error);
    }
  };

  const fetchCommentsInQuestion = async () => {
    try {
      const response = await Apiservice.getListComment();
      const atemp = response.filter((ques) => ques.questionID == qid);

      setCommentsInQuestion(
        atemp.map((com) => {
          const acc = account.find((a) => a.id == com.accountID);
          console.log({ ...com, acc });
          return { ...com, acc };
        })
      );
    } catch (error) {
      console.error("Error fetching Comment:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:9999/Comment", {
        accountID: currentAccountId,
        questionID: currentQuestion.id,
        title: commentContent,
        content: commentContent
      });
    } catch (error) {
      console.error("Error adding Comment:", error);
    }
  };
  useEffect(() => {
    fetchCurrentCourse();
    fetchCurrentSlot();
    fetchCurrentQuestion();
    fetchQuestionsInSlot();
    fetchCommentsInQuestion();
    fetchAccountInQuestion();
  }, [handleSubmit]);

  return (
    <>
      <div style={fontStyle}>
        <div className="fixed top-[10px] right-[30px]">
          <p style={{ fontSize: ".625rem" }}>APHL</p>
        </div>
        <div className="flex sticky">
          <MainRight />
          <div>
            <nav style={navStyles}>
              <ul style={ulStyles}>
                <li>
                  <Link to="/" style={linkStyles}>
                    Home
                  </Link>
                </li>
                <div style={slashStyles}>/</div>
                <li>
                  <Link
                    to={`/course?id=${currentCourse.id}&classID=${
                      JSON.parse(localStorage.getItem("Account")).classID
                    }`}
                    style={linkStyles}
                  >
                    {currentCourse.name}
                  </Link>
                </li>
                <div style={slashStyles}>/</div>
                <li>
                  <Link to="/FER202/slot1" style={linkStyles}>
                    {currentSlot.name}
                  </Link>
                </li>
                <div style={slashStyles}>/</div>
                <li>
                  <Link style={linkedStyles}>{currentQuestion.title}</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div style={contentStyles}>
            <span style={titleStyles}>(Question) {currentQuestion.title}</span>
            <div style={boxStyle}>
              <div style={content_boxStyle}>
                <h3 style={h3_boxStyle}>Content</h3>
                <hr />
                <div style={{ padding: "5px" }}>
                  <span>{currentQuestion.content}</span>
                </div>
              </div>
            </div>
            <div style={{ marginTop: "10px" }}>
              <span>Discussion time has been started.</span>
              <br />
              <span>
                Students can comment and vote for comments during this time.
              </span>
              <br />
              <span>Current Timezone: You are currently in</span>{" "}
              <span style={{ fontWeight: "bold" }}>Asia/Bangkok</span>{" "}
              <span>time zone</span>{" "}
              <span style={{ fontWeight: "bold" }}>(GMT+7)</span>
              <br />
            </div>
            <nav style={navStyles1}>
              <Link to="/" style={linkStyles1}>
                GROUP
              </Link>
              <Link
                to="/discuss"
                style={{ ...linkStyles1, ...activeLinkStyles }}
              >
                DISCUSS
              </Link>
              <Link to="/grade" style={linkStyles1}>
                GRADE
              </Link>
              <Link to="/message" style={linkStyles1}>
                TEACHER'S MESSAGE
              </Link>
            </nav>
            <div style={discussdivStyle}>
              <input
                style={discussStyle}
                type="text"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
              />
              <button style={sendButton} type="submit" onClick={handleSubmit}>
                Send
              </button>
            </div>
            <div>
              {commentsInQuestion.map((com, index) => (
                <div style={{ marginBottom: "20px" }} key={index}>
                  <span style={accountNameInCommentStyle}>{com.acc.name} </span>
                  <br />
                  <div style={divCommentStyle}>
                    <span style={commentStyle}>{com.content}</span>
                  </div>
                  <br />
                  <span>reply </span>&nbsp;<span>vote </span>
                </div>
              ))}
            </div>
          </div>
          <div style={rightStyles}>
            <span style={rightTitle}>Group meeting</span>
            <br />
            <span style={rightReport}>
              No meeting video link, click the below button to update
            </span>
            <br />
            <button style={buttonRight}>UPDATE</button>
            <br />
            <span style={rightTitle}>Individual grade</span>
            <br />
            <span style={rightReport}>
              No meeting video link, click the below button to update
            </span>
            <br />
            <button style={buttonRight1}>GRADE ON GROUPMATES</button>
            <br />
            <span style={rightTitle}>Call Video</span>
            <br />
            <button style={buttonRight2}>JOIN STREAM</button>
            <br />
            <span style={rightTitle}>Pass criteria</span>
            <br />
            <br />
            <span>View Questions</span>
            <br />
            <span>No. of comments posted </span>
            <span style={{ marginLeft: "116px" }}>1</span>
            <br />
            <span>No. of stars rated by others</span>
            <span style={{ marginLeft: "100px" }}>1</span>
            <br />
            <span>No. of votes</span>
            <span style={{ marginLeft: "210px" }}>1</span>
            <br />
            <br />
            <br />
            <span style={rightTitle}>Table of contents</span>
            <br />
            <br />
            <span>question</span>
            <div>
              {questionsInSlot.map((ques) => (
                <button style={buttonRight3}>
                  <p style={{ lineHeight: "2.4", width: "200px" }}>
                    {ques.title}
                  </p>
                  <p
                    style={{
                      lineHeight: "1.2",
                      width: "100px",
                      color: "rgb(0, 120, 212)",
                      backgroundColor: "rgb(239, 246, 252)",
                      marginTop: "10px"
                    }}
                  >
                    On-going
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailQuestion;
