import { useState } from "react";
import Actions from "./Actions";
import SearchBar from "./SearchBar";
import Tasklist from "./Tasklist";
import AddTaskModal from "./AddTaskModal";

const TaskBoard = () => {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React Native",
    description:
      "I want to Learn React such thanI can treat it like my slave and make it do whatever I want to do.",
    tags: ["web", "react", "js"],
    priority: "High",
    isFavorite: true,
  };
  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  
  const handleAddEditTask = (e, newTask, isAdd) => {
    e.preventDefault();
    console.log(isAdd)
    if (isAdd) {
      setTasks([...tasks, newTask]);

    }else {
      setTasks(
        tasks.map(task => {
          if(task.id === newTask.id){
            return newTask
          }
          return task
        })
      )
    }
    setShowAddModal(false);
  };

  const handleEditTask = (task) => {
    setTaskToUpdate(task);
    setShowAddModal(true);
   
  };

  const handleModalClose = () => {
    setShowAddModal(false);
    setTaskToUpdate(null);
  };

  const handleDeleteTask = (task) => {
     const newTasks = tasks.filter(t => t.id !== task.id)
     setTasks(newTasks)
  };

  const handleAllTasksDelete = () => {
      tasks.length = 0;
     setTasks([...tasks])
  };
  // eslint-disable-next-line no-unused-vars
  const handleFavorite = (selectedTask) => {
    setTasks(tasks.map((task) => { 
      if (task.id === selectedTask.id) {
          return {...task, isFavorite: !task.isFavorite};
      } else {
          return task;
      }
  }))
     
  };



  const handleSearch = (searchTerm) => {
    console.log(searchTerm);
    const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setTasks([...filteredTasks]);
  };

  




  return (
    <section className="mb-20" id="tasks">
      {showAddModal && <AddTaskModal onSave={handleAddEditTask} taskToUpdate={taskToUpdate} onModalClose={handleModalClose}/>}
      <div className="container">
        <SearchBar onSearch={handleSearch}/>
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <Actions onAllTasksDelete = {handleAllTasksDelete} onAddClick={() => setShowAddModal(true)} />
          <Tasklist OnFavorite ={handleFavorite} onDeleteTask={handleDeleteTask} onEdit={handleEditTask} tasks={tasks} />
        </div>
      </div>
    </section>
  );
};

export default TaskBoard;
