import api from "./api";

const getAllMembers = async () => {
  const response = await api.get("/members");
  return response.data;
};

const getMemberById = async (id) => {
  const response = await api.get(`/members/${id}`);
  return response.data;
};

const addMember = async (memberData) => {
  const response = await api.post("/members", memberData);
  return response.data;
};

const updateMember = async (id, memberData) => {
  const response = await api.put(`/members/${id}`, memberData);
  return response.data;
};

const deleteMember = async (id) => {
  const response = await api.delete(`/members/${id}`);
  return response.data;
};

const searchMembers = async (keyword) => {
  const response = await api.get("/members/search", {
    params: {
      keyword,
    },
  });

  return response.data;
};

const getMembersWithPagination = async (
  page = 0,
  size = 5,
  sortBy = "memberId",
  direction = "asc"
) => {
  const response = await api.get("/members/page", {
    params: {
      page,
      size,
      sortBy,
      direction,
    },
  });

  return response.data;
};

const memberService = {
  getAllMembers,
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
  searchMembers,
  getMembersWithPagination,
};

export default memberService;