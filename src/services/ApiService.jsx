import axios from "axios";

const API_URL_ACCOUNT = "http://localhost:9999/Account";
const API_URL_CLASS = "http://localhost:9999/Class";
const API_URL_SEMESTER = "http://localhost:9999/Semester";
const API_URL_SLOT = " http://localhost:9999/Slot";
const API_URL_STATUS = "http://localhost:9999/Status";
const API_URL_COURSE = "http://localhost:9999/Course";
const API_URL_QUESTION = "http://localhost:9999/Question";
const API_URL_COMMENT = "http://localhost:9999/Comment";
const API_URL_ACCOUNTCOURSE = "http://localhost:9999/AccountCourse";
const API_URL_ACCOUNTSEMESTER = "http://localhost:9999/AccountSemester";
const API_URL_CONTENTCOURSE = "http://localhost:9999/ContentCourse";

const Apiservice = {
  getListAccount: async () => {
    const response = await axios.get(API_URL_ACCOUNT);
    return response.data;
  },
  getListSemester: async () => {
    const response = await axios.get(API_URL_SEMESTER);
    return response.data;
  },
  getListClass: async () => {
    const response = await axios.get(API_URL_CLASS);
    return response.data;
  },
  getListCourse: async () => {
    const response = await axios.get(API_URL_COURSE);
    return response.data;
  },
  getCourseById: async (id) => {
    const response = await axios.get(`${API_URL_COURSE}/${id}`);
    return response.data;
  },
  getListSlot: async () => {
    const response = await axios.get(API_URL_SLOT);
    return response.data;
  },
  getSlotById: async (id) => {
    const response = await axios.get(`${API_URL_SLOT}/${id}`);
    return response.data;
  },
  getListQuestion: async () => {
    const response = await axios.get(API_URL_QUESTION);
    return response.data;
  },
  getQuestionById: async (id) => {
    const response = await axios.get(`${API_URL_QUESTION}/${id}`);
    return response.data;
  },
  getListComment: async () => {
    const response = await axios.get(API_URL_COMMENT);
    return response.data;
  },
  getListAccountCourse: async () => {
    const response = await axios.get(API_URL_ACCOUNTCOURSE);
    return response.data;
  },
  getListAccountSemester: async () => {
    const response = await axios.get(API_URL_ACCOUNTSEMESTER);
    return response.data;
  },
  getListStatus: async () => {
    const response = await axios.get(API_URL_STATUS);
    return response.data;
  },
  getListContentCourse: async () => {
    const response = await axios.get(API_URL_CONTENTCOURSE);
    return response.data;
  }
};

export default Apiservice;
