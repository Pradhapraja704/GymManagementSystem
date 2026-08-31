import api from "./api";

const getAllTrainers = async () => {
  const response = await api.get("/trainers");
  return response.data;
};

const getTrainerById = async (id) => {
  const response = await api.get(`/trainers/${id}`);
  return response.data;
};

const addTrainer = async (trainerData) => {
  const response = await api.post("/trainers", trainerData);
  return response.data;
};

const updateTrainer = async (id, trainerData) => {
  const response = await api.put(`/trainers/${id}`, trainerData);
  return response.data;
};

const deleteTrainer = async (id) => {
  const response = await api.delete(`/trainers/${id}`);
  return response.data;
};

const searchTrainers = async (keyword) => {
  const response = await api.get("/trainers/search", {
    params: { keyword },
  });

  return response.data;
};

const getTrainersWithPagination = async (
  page = 0,
  size = 5,
  sortBy = "trainerId",
  direction = "asc"
) => {
  const response = await api.get("/trainers/page", {
    params: {
      page,
      size,
      sortBy,
      direction,
    },
  });

  return response.data;
};

const trainerService = {
  getAllTrainers,
  getTrainerById,
  addTrainer,
  updateTrainer,
  deleteTrainer,
  searchTrainers,
  getTrainersWithPagination,
};

export default trainerService;