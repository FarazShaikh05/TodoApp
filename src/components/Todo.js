import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const Todo = () => {
    const [todo, setTodo] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    const [newTodo, setNewTodo] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [showAddTodo, setShowAddTodo] = useState(false);
    const [currentView, setCurrentView] = useState('todos');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [addTodoError,setAddTodoError] = useState('');
    const datePickerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todo));
    }, [todo]);

    const displayTodo = () => {
        setShowAddTodo(true);
    };

    const addTodo = () => {
        const dateToUse = selectedDate || new Date();
        if(newTodo === ""){
            setAddTodoError("Enter task");
            console.log("text error")
           
        }
        if (newTodo.trim()) {
            const todoItem = {
                text: newTodo,
                date: dateToUse,
                finished: false
            };
            setTodo(prevTodo => [...prevTodo, todoItem]);
            setNewTodo('');
            setSelectedDate(null);
            setShowAddTodo(false);
        }
    };

    const formatDate = (date) => {
        if (!date || isNaN(new Date(date))) return '';
        const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
    };

    const markAsFinished = (index) => {
        setTodo(prevTodo =>
            prevTodo.map((item, idx) =>
                idx === index ? { ...item, finished: !item.finished } : item
            )
        );
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleLogout = () => {
        navigate('/login');
    };

    const profileUpdate = () => {
        navigate('/update-profile');
    };

    const calendarIcon = () => {
        datePickerRef.current.setOpen(true);
    };

    const handleTodoInputChange = (e) => {
        const inputValue = e.target.value;
        setNewTodo(inputValue);
    
        if (inputValue === "") {
            setAddTodoError("Please Enter the Todo-Task.");
        } else {
            setAddTodoError('');
        }
    };

    return (
        <div className='todo-div'>
            <nav className='navbar'>
                <div className='icon'>
                    <span className='sidebar-icon' onClick={toggleSidebar}>&#9776;</span>
                </div>
                <div className='nav-todo'>
                    <h1>Todos</h1>
                </div>
                <div className='nav-calendar-icon' onClick={calendarIcon}>
                    <i className="fa-regular fa-calendar-check"></i>
                </div>
            </nav>


            <div className="container">
                <div className="row">
                    {todo.filter(item => currentView === 'todos' ? !item.finished : item.finished).map((item, index) => (
                        <div className="col-12 col-sm-6 col-lg-4 mb-3" key={index}>
                            <div className='todo-content'>
                                {item.finished ? "Completed" : "Task to Complete"}
                                <h2 className='date-content'>{formatDate(item.date)}</h2>
                                <hr />
                                <p className='task-content'>{item.text}</p>
                                <button onClick={() => markAsFinished(index)} className='finish-btn'>
                                    {item.finished ? 'Undo' : 'Finish'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <button onClick={displayTodo} className='add-btn'>+</button>

            {showAddTodo && (
                <div className="add-todo-form">
                    <div className='add-todo-content'>
                        <div className="selected-date">
                            {selectedDate ? formatDate(selectedDate) : formatDate(new Date())}
                        </div>
                        <textarea
                            className='add-todo-subcontent'
                            placeholder="Enter todo task"
                            value={newTodo}
                            onChange={handleTodoInputChange} 
                        />
                         {addTodoError && <p className="error">{addTodoError}</p>}
                        <button onClick={addTodo} className='add-todo-btn'>Add Todo</button>
                    </div>
                </div>
            )}

            <div className='tab-div'>
                <button className='tabs' onClick={() => setCurrentView('todos')}>
                    TODOS
                </button>
                <button className='tabs' onClick={() => setCurrentView('finished')}>
                    FINISHED
                </button>
            </div>

            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <h4 className='sidebar-title'>Menu</h4>
                <hr />
                <a href="#" onClick={toggleSidebar}>Home</a>
                <a href="#" onClick={toggleSidebar}>Report</a>
                <a href="#" onClick={profileUpdate}>Profile</a>
                <a href="#" onClick={handleLogout}>Logout</a>
            </div>

            <DatePicker
                ref={datePickerRef}
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="MMMM d, yyyy"
                withPortal
                className="hidden-date-picker" />
            
        </div>
    );
};

export default Todo;

















