import api from "./api";

const getAllDietPlans = async () => {
  const response = await api.get("/diet-plans");
  return response.data;
};

const getDietPlanById = async (id) => {
  const response = await api.get(`/diet-plans/${id}`);
  return response.data;
};

const addDietPlan = async (dietData) => {
  const response = await api.post("/diet-plans", dietData);
  return response.data;
};

const updateDietPlan = async (id, dietData) => {
  const response = await api.put(`/diet-plans/${id}`, dietData);
  return response.data;
};

const deleteDietPlan = async (id) => {
  const response = await api.delete(`/diet-plans/${id}`);
  return response.data;
};

const getDietPlansByMemberId = async (memberId) => {
  const response = await api.get(`/diet-plans/member/${memberId}`);
  return response.data;
};

const searchDietPlansByBreakfast = async (breakfast) => {
  const response = await api.get("/diet-plans/search/breakfast", {
    params: { breakfast },
  });

  return response.data;
};

const searchDietPlansByNotes = async (keyword) => {
  const response = await api.get("/diet-plans/search/notes", {
    params: { keyword },
  });

  return response.data;
};

const getDietPlansWithPagination = async (
  page = 0,
  size = 5,
  sortBy = "planId",
  direction = "asc"
) => {
  const response = await api.get("/diet-plans/page", {
    params: {
      page,
      size,
      sortBy,
      direction,
    },
  });

  return response.data;
};

const dietService = {
  getAllDietPlans,
  getDietPlanById,
  addDietPlan,
  updateDietPlan,
  deleteDietPlan,
  getDietPlansByMemberId,
  searchDietPlansByBreakfast,
  searchDietPlansByNotes,
  getDietPlansWithPagination,
};

export default dietService;