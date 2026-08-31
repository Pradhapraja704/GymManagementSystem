import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import AddDietPlan from "../pages/diets/AddDietPlan";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

import MemberList from "../pages/members/MemberList";
import AddMember from "../pages/members/AddMember";
import EditMember from "../pages/members/EditMember";
import EditDietPlan from "../pages/diets/EditDietPlan";

import TrainerList from "../pages/trainers/TrainerList";
import AddTrainer from "../pages/trainers/AddTrainer";
import EditTrainer from "../pages/trainers/EditTrainer";

import AttendanceList from "../pages/attendance/AttendanceList";
import AddAttendance from "../pages/attendance/AddAttendance";

import TrainerAssignment from "../pages/assignments/TrainerAssignment";
import AddAssignment from "../pages/assignments/AddAssignment";

import WorkoutPlan from "../pages/workouts/WorkoutPlan";
import AddWorkoutPlan from "../pages/workouts/AddWorkoutPlan";
import EditWorkoutPlan from "../pages/workouts/EditWorkoutPlan";

import MembershipPlan from "../pages/memberships/MembershipPlan";
import AddMembershipPlan from "../pages/memberships/AddMembershipPlan";
import EditMembershipPlan from "../pages/memberships/EditMembershipPlan";

import DietPlan from "../pages/diets/DietPlan";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Members */}
        <Route
          path="/members"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <MemberList />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/members/add"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AddMember />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/members/edit/:id"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <EditMember />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Trainers */}
        <Route
          path="/trainers"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <TrainerList />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/trainers/add"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AddTrainer />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/trainers/edit/:id"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <EditTrainer />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Attendance */}
        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AttendanceList />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance/add"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AddAttendance />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Trainer Assignment */}
        <Route
          path="/assignments"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <TrainerAssignment />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/assignments/add"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AddAssignment />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Workout Plans */}
        <Route
          path="/workouts"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <WorkoutPlan />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/workouts/add"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AddWorkoutPlan />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/workouts/edit/:id"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <EditWorkoutPlan />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Membership Plans */}
        <Route
          path="/memberships"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <MembershipPlan />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/memberships/add"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AddMembershipPlan />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/memberships/edit/:id"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <EditMembershipPlan />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Diet Plans */}
        <Route
          path="/diets"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <DietPlan />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
  path="/diets/add"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <AddDietPlan />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/diets/edit/:id"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <EditDietPlan />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>

        {/* Default */}
        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;