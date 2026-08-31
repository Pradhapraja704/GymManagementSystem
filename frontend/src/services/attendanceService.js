import api from "./api";

const getAllAttendance = async () => {
  const response = await api.get("/attendance");
  return response.data;
};

const getAttendanceById = async (id) => {
  const response = await api.get(`/attendance/${id}`);
  return response.data;
};

const addAttendance = async (attendanceData) => {
  const response = await api.post("/attendance", attendanceData);
  return response.data;
};

const updateAttendance = async (id, attendanceData) => {
  const response = await api.put(`/attendance/${id}`, attendanceData);
  return response.data;
};

const deleteAttendance = async (id) => {
  const response = await api.delete(`/attendance/${id}`);
  return response.data;
};

const getAttendanceByMemberId = async (memberId) => {
  const response = await api.get(`/attendance/member/${memberId}`);
  return response.data;
};

const attendanceService = {
  getAllAttendance,
  getAttendanceById,
  addAttendance,
  updateAttendance,
  deleteAttendance,
  getAttendanceByMemberId,
};

export default attendanceService;