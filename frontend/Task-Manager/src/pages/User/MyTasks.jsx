  import React, { useEffect, useState } from 'react'
  import DashboardLayout from '../../components/layouts/DashboardLayout'
  import { useNavigate } from 'react-router-dom';
  import axios from 'axios';
  import axiosInstance from '../../utils/axiosInstance';
  import { API_PATHS } from '../../utils/apiPaths';
  import { LuFileSpreadsheet } from 'react-icons/lu';
  import TaskStatusTabs from '../../components/TaskStatusTabs';
  import { toast } from 'react-hot-toast';

  const MyTasks = () => {
    const [allTasks, setAllTasks] = useState([]);
    const [tabs, setTabs] = useState([]);
    const [filterStatus, setFilterStatus] = useState("All");

    const navigate = useNavigate();
    const getAllTasks = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS,{
          params: {
            status: filterStatus === "All" ? "" : filterStatus,
          },
        });
        setAllTasks(response.data?.tasks?.length > 0 ? response.data.tasks : [])

        const statusSummary = response.data?.statusSummary || {};
        const statusArray = [
          {label: "All", count: statusSummary.all || 0},
          {label: "Pending", count: statusSummary.pendingTasks || 0},
          {label: "In Progress", count: statusSummary.inProgressTasks || 0},
          {label: "Completed", count: statusSummary.completedTasks || 0},
        ];
        setTabs(statusArray);
      } catch (error){
        console.error("Error fetching users: ", error);
      }
    };

    const handleClick = (taskId) =>{
      navigate(`/user/task-details/${taskId}`);
      console.log(taskId);
      
    };


    useEffect(() => {
      getAllTasks(filterStatus);
      return () => {};
    }, [filterStatus]);

    const todoTasks = allTasks.filter(t => t.status === "Pending");
    const progressTasks = allTasks.filter(t => t.status === "In Progress");
    const doneTasks = allTasks.filter(t => t.status === "Completed");

    return ( 
    <DashboardLayout activeMenu="My Tasks">
      <div className="my-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            <h2 className="text-xl md:text-xl font-medium">My Work Board 🎯</h2>


          {tabs?.[0]?.count > 0 && (
              <TaskStatusTabs 
                tabs = {tabs}
                activeTab = {filterStatus}
                setActiveTab = {setFilterStatus}
              />
          )}
        </div>

       
      </div>
    </DashboardLayout>
    );
  };

  export default MyTasks