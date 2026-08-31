import api from "./api";

const getAllMembershipPlans = async () => {
  const response = await api.get("/membership-plans");
  return response.data;
};

const getMembershipPlanById = async (id) => {
  const response = await api.get(`/membership-plans/${id}`);
  return response.data;
};

const addMembershipPlan = async (planData) => {
  const response = await api.post("/membership-plans", planData);
  return response.data;
};

const updateMembershipPlan = async (id, planData) => {
  const response = await api.put(`/membership-plans/${id}`, planData);
  return response.data;
};

const deleteMembershipPlan = async (id) => {
  const response = await api.delete(`/membership-plans/${id}`);
  return response.data;
};

const searchMembershipPlans = async (planName) => {
  const response = await api.get("/membership-plans/search/name", {
    params: { planName },
  });

  return response.data;
};

const getMembershipPlansWithPagination = async (
  page = 0,
  size = 5,
  sortBy = "planId",
  direction = "asc"
) => {
  const response = await api.get("/membership-plans/page", {
    params: {
      page,
      size,
      sortBy,
      direction,
    },
  });

  return response.data;
};

const membershipService = {
  getAllMembershipPlans,
  getMembershipPlanById,
  addMembershipPlan,
  updateMembershipPlan,
  deleteMembershipPlan,
  searchMembershipPlans,
  getMembershipPlansWithPagination,
};

export default membershipService;