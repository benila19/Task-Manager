import React, { useContext, useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth';
import { UserContext } from '../../context/userContext';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import moment from 'moment';
import InfoCard from '../../components/Cards/InfoCard';
import { addThousandsSeparator } from '../../utils/helper';
import { LuArrowRight } from 'react-icons/lu';
import TaskListTable from '../../components/TaskListTable';
import CustomPieChart from '../../components/Charts/CustomPieChart';
import CustomBarChart from '../../components/Charts/CustomBarChart';

const COLORS = ["#8D51FF", "#00B8DB", "#7BCE00"];


const UserDashboard = () => {
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    charts: {
      taskDustrubution: null,
      taskPriorityLevels: null,
    },
    recentTasks: [],
  });
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.TASKS.GET_USER_DASHBOARD_DATA);
        if (response.data) {
          setDashboardData(response.data);
          prepareChartData(response.data.charts);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getDashboardData();
  }, []);

  const prepareChartData = (charts) => {
    const taskDustrubution = charts?.taskDustrubution || null;
    const taskPriorityLevels = charts?.taskPriorityLevels || null;

    const taskDustrubutionData = [
      { status: "Pending", count: taskDustrubution?.Pending || 0 },
      { status: "In Progress", count: taskDustrubution?.InProgress || 0 },
      { status: "Completed", count: taskDustrubution?.Completed || 0 },
    ];

    setPieChartData(taskDustrubutionData);

    const PriorityLevelData = [
      { priority: "Low", count: taskPriorityLevels?.Low || 0 },
      { priority: "Medium", count: taskPriorityLevels?.Medium || 0 },
      { priority: "High", count: taskPriorityLevels?.High || 0 },
    ];

    setBarChartData(PriorityLevelData);
  };

  const onSeeMore = () => {
    navigate("/user/tasks");
  };

  return (
    <DashboardLayout activeMenu="Dashboard">
      {/* Profile Section */}
      <div className="card my-5 bg-gradient-to-r from-cyan-500 to-teal-600 text-white">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <img 
              src={user?.profileImageUrl || "https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png"} 
              alt="Profile" 
              className="w-24 h-24 rounded-full border-4 border-white object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold">{user?.name || "User"}</h2>
            <p className="text-cyan-100 mt-1">{user?.email || ""}</p>
            <p className="text-cyan-100 text-sm mt-2">
              Status: <span className="font-semibold uppercase">{user?.role || "member"}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="card my-5">
        <div>
          <div className="col-span-3">
           <h2 className="text-2xl font-bold text-gray-800">
  My Work Board 📊
</h2>
<p className="text-sm text-gray-500 mt-1">
  Track your tasks and progress
</p>
            <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">
              {moment().format("dddd Do MMMM YYYY")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md-gap-6 mt-5">
          <InfoCard
            label="Total Tasks"
            value={addThousandsSeparator(dashboardData.statusSummary?.all || 0)}
            color="bg-gradient-to-r from-cyan-500 to-cyan-600"
          />

          <InfoCard
            label="Pending Tasks"
            value={addThousandsSeparator(dashboardData.statusSummary?.pendingTasks || 0)}
            color="bg-gradient-to-r from-yellow-400 to-orange-500"
          />

          <InfoCard
            label="In Progress Tasks"
            value={addThousandsSeparator(dashboardData.statusSummary?.inProgressTasks || 0)}
            color="bg-gradient-to-r from-cyan-600 to-teal-600"
          />

          <InfoCard
            label="Completed Tasks"
            value={addThousandsSeparator(dashboardData.statusSummary?.completedTasks || 0)}
            color="bg-gradient-to-r from-green-500 to-emerald-600"
          />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6">
        {/* Task Distribution Chart */}
        <div className="card">
          <h5 className="text-lg font-semibold mb-4">Task Distribution</h5>
          <CustomPieChart data={pieChartData} />
        </div>

        {/* Priority Levels Chart */}
        <div className="card">
          <h5 className="text-lg font-semibold mb-4">Priority Levels</h5>
          <CustomBarChart data={barChartData} />
        </div>
      </div>

      {/* Recent Tasks Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6">
        <div className="md:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between">
              <h5 className="text-lg font-semibold">My Recent Tasks 📋</h5>

              <button className="card-btn" onClick={onSeeMore}>
                See All <LuArrowRight className="text-base" />
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-4">
              {dashboardData.recentTasks && dashboardData.recentTasks.length > 0 ? (
                dashboardData.recentTasks.map((task) => (
                  <div key={task._id} className="p-4 rounded-xl shadow-md bg-white hover:shadow-lg transition border-l-4 border-cyan-500">
                    <h3 className="font-semibold text-gray-800">{task.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      <span className={`px-2 py-1 rounded-full text-white text-xs ${task.status === 'Completed' ? 'bg-green-500' : task.status === 'In Progress' ? 'bg-blue-500' : 'bg-yellow-500'}`}>
                        {task.status}
                      </span>
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Priority: <span className="font-medium">{task.priority || 'Medium'}</span>
                    </p>
                    <p className="text-xs text-gray-400">
                      Due: {task.dueDate ? new Date(task.dueDate).toDateString() : "No deadline"}
                    </p>
                  </div>
                ))
              ) : (
                <div className="md:col-span-3 text-center py-8 text-gray-500">
                  No recent tasks
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
