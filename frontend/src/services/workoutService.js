import api from "./api";

const getAllWorkoutPlans = async () => {
  const response = await api.get("/workout-plans");
  return response.data;
};

const getWorkoutPlanById = async (id) => {
  const response = await api.get(`/workout-plans/${id}`);
  return response.data;
};

const addWorkoutPlan = async (workoutData) => {
  const response = await api.post("/workout-plans", workoutData);
  return response.data;
};

const updateWorkoutPlan = async (id, workoutData) => {
  const response = await api.put(`/workout-plans/${id}`, workoutData);
  return response.data;
};

const deleteWorkoutPlan = async (id) => {
  const response = await api.delete(`/workout-plans/${id}`);
  return response.data;
};

const getWorkoutPlansByMemberId = async (memberId) => {
  const response = await api.get(`/workout-plans/member/${memberId}`);
  return response.data;
};

const workoutService = {
  getAllWorkoutPlans,
  getWorkoutPlanById,
  addWorkoutPlan,
  updateWorkoutPlan,
  deleteWorkoutPlan,
  getWorkoutPlansByMemberId,
};

export default workoutService;