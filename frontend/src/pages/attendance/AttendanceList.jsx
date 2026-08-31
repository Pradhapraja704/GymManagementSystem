import { useEffect, useState } from "react";
import attendanceService from "../../services/attendanceService";
import memberService from "../../services/memberService";
import assignmentService from "../../services/assignmentService";
import Loading from "../../components/Loading";

const AttendanceList = () => {
  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [members, setMembers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [loading, setLoading] = useState(true);
  const [savingMember, setSavingMember] = useState(null);
  const [error, setError] = useState("");

  const loadAttendanceData = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        memberResponse,
        assignmentResponse,
        attendanceResponse,
      ] = await Promise.all([
        memberService.getAllMembers(),
        assignmentService.getAllAssignments(),
        attendanceService.getAllAttendance(),
      ]);

      setMembers(
        Array.isArray(memberResponse)
          ? memberResponse
          : []
      );

      setAssignments(
        Array.isArray(assignmentResponse)
          ? assignmentResponse
          : []
      );

      setAttendance(
        Array.isArray(attendanceResponse)
          ? attendanceResponse
          : []
      );
    } catch (err) {
      console.error("Failed to load attendance:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load attendance data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAttendanceData();
  }, []);

  const getAssignment = (memberId) => {
    return assignments.find(
      (assignment) =>
        assignment.memberId === memberId &&
        assignment.active === true
    );
  };

  const getAttendanceRecord = (memberId) => {
    return attendance.find(
      (record) =>
        record.memberId === memberId &&
        record.attendanceDate === selectedDate
    );
  };

  const markAttendance = async (member, status) => {
    const assignment = getAssignment(member.memberId);

    if (!assignment) {
      setError(
        `No active trainer assigned to ${member.firstName} ${member.lastName}`
      );
      return;
    }

    try {
      setSavingMember(member.memberId);
      setError("");

      const existingRecord = getAttendanceRecord(
        member.memberId
      );

      const currentTime = new Date()
        .toTimeString()
        .slice(0, 8);

      const attendanceData = {
        memberId: member.memberId,
        trainerId: assignment.trainerId,
        attendanceDate: selectedDate,
        checkInTime: currentTime,
        checkOutTime: null,
        status: status,
        remarks: "",
      };

      let response;

      if (existingRecord) {
        response = await attendanceService.updateAttendance(
          existingRecord.attendanceId,
          attendanceData
        );

        setAttendance((previous) =>
          previous.map((record) =>
            record.attendanceId ===
            existingRecord.attendanceId
              ? response
              : record
          )
        );
      } else {
        response =
          await attendanceService.addAttendance(
            attendanceData
          );

        setAttendance((previous) => [
          ...previous,
          response,
        ]);
      }
    } catch (err) {
      console.error("Failed to mark attendance:", err);

      setError(
        err.response?.data?.message ||
          "Failed to mark attendance"
      );
    } finally {
      setSavingMember(null);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="page-container">

      <div className="page-header">
        <div>
          <h1>Attendance</h1>
          <p>Mark daily member attendance</p>
        </div>

        <div className="form-group">
          <label>Attendance Date</label>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) =>
              setSelectedDate(e.target.value)
            }
          />
        </div>
      </div>

      {error && (
        <p className="login-error">
          {error}
        </p>
      )}

      {members.length === 0 ? (
        <div className="empty-state">
          <p>No members found.</p>
        </div>
      ) : (
        <div className="table-container">

          <table className="data-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Member</th>
                <th>Trainer</th>
                <th>Status</th>
                <th>Mark Attendance</th>
              </tr>
            </thead>

            <tbody>

              {members.map((member) => {
                const assignment = getAssignment(
                  member.memberId
                );

                const record = getAttendanceRecord(
                  member.memberId
                );

                const isSaving =
                  savingMember === member.memberId;

                return (
                  <tr key={member.memberId}>

                    <td>
                      {member.memberId}
                    </td>

                    <td>
                      <strong>
                        {member.firstName}{" "}
                        {member.lastName}
                      </strong>
                    </td>

                    <td>
                      {assignment
                        ? `Trainer #${assignment.trainerId}`
                        : "Not Assigned"}
                    </td>

                    <td>
                      {record ? (
                        <strong>
                          {record.status}
                        </strong>
                      ) : (
                        "Not Marked"
                      )}
                    </td>

                    <td>
                      <div className="action-buttons">

                        <button
                          type="button"
                          className="edit-button"
                          disabled={isSaving}
                          onClick={() =>
                            markAttendance(
                              member,
                              "Present"
                            )
                          }
                        >
                          {isSaving
                            ? "Saving..."
                            : "Present"}
                        </button>

                        <button
                          type="button"
                          className="delete-button"
                          disabled={isSaving}
                          onClick={() =>
                            markAttendance(
                              member,
                              "Absent"
                            )
                          }
                        >
                          Absent
                        </button>

                      </div>
                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
};

export default AttendanceList;