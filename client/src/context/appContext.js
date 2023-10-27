import React, { useContext, useReducer } from "react";
import reducer from "./reducer.js";
import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS,
    LOGIN_USER_BEGIN,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_TASK_BEGIN,
    CREATE_TASK_SUCCESS,
    CREATE_TASK_ERROR,
    GET_TASKS_BEGIN,
    GET_TASKS_ERROR,
    GET_TASKS_SUCCESS,
    SET_UPDATE_TASK_BEGIN,
    UPDATE_TASK_BEGIN,
    UPDATE_TASK_ERROR,
    UPDATE_TASK_SUCCESS,
    DELETE_TASK_BEGIN,
    DELETE_TASK_ERROR,
    DELETE_TASK_SUCCESS,

} from './actions.js'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

const initialState = {
    isLoading: false,
    showAlert: false,
    alertMsg: "",
    alertType: "",
    user: user ? JSON.parse(user) : null,
    token: token,
    description:"",
    tasks: [],
    taskId:"",
    isEditing:false,


}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const displayAlert = (msg, type) => {
        dispatch({
            type: DISPLAY_ALERT,
            payload: { msg, type }
        })
        clearAlert()
    }
    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT })
        }, 1500);
    }

    const addToLocalStorage = ({ user, token }) => {
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("token", token)
    }

    const removeFromLocalStorage = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
    }



    //--------------------------register user-----------//
    const signUpUser = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN })

        await fetch("<YOUR_BACKEND_URL>", {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currentUser)
        }).then(async (response) => {
            const data = await response.json()
            const { user, token } = data;

            if (!response.ok) {
                const error = data;
                return Promise.reject(error);
            }
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: { user, token }
            })
            addToLocalStorage({user, token })
        }
        ).catch(error => {

            dispatch({
                type: REGISTER_USER_ERROR,
                payload: { msg: error.msg }
            })
        })
        clearAlert();

    }

    //--------------------------login user-----------//

    const loginUser = async (currentUser) => {
        dispatch({ type: LOGIN_USER_BEGIN })

        await fetch("https://task-manager-jw8c.onrender.com/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(currentUser)
        }).then(async (response) => {
            const data = await response.json();
            const {user, token} = data;

            if (!response.ok) {
                const error = data;
                return Promise.reject(error)
            }

            dispatch({
                type:LOGIN_USER_SUCCESS,
                payload:{user, token}
            })
            addToLocalStorage({user, token})
        }).catch(error =>{
            dispatch({
                type: LOGIN_USER_ERROR,
                payload:{msg: error.msg}
            })
        })
        clearAlert()

    }

    //---------------------------logOut User---------------------//
    const logoutUser = () => {
        dispatch({type: LOGOUT_USER})
        removeFromLocalStorage()
    }

    //====================HandleChange================================//
    const handleChange = ({name, value})=>{
        dispatch({
            type: HANDLE_CHANGE,
            payload: {name, value}
        })
    }

    //==========================Clear values======================//
    const clearValues =()=>{
        dispatch({type: CLEAR_VALUES})
    }


    //==========================Create Task=======================//

    const createTask = async(currentTask)=>{
        dispatch({type: CREATE_TASK_BEGIN})
        await fetch("https://task-manager-jw8c.onrender.com/api/v1/tasks/", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${state.token}`
            },
            body: JSON.stringify(currentTask)
        }).then(async (response)=>{
            const data = await response.json();

            if(!response.ok){
                const error = data
                return Promise.reject(error)
            }
            dispatch({
                type: CREATE_TASK_SUCCESS,
                payload: {currentTask}
            })
            dispatch({type: CLEAR_VALUES})
        }).catch((error)=>{
            dispatch({
                type: CREATE_TASK_ERROR,
                payload: {msg: error.msg}
            })
        })
        clearAlert()
        getTasks()
    }

//==========================Get All Tasks=======================//
    const getTasks = async()=>{
        dispatch({type: GET_TASKS_BEGIN})
        await fetch("https://task-manager-jw8c.onrender.com/api/v1/tasks/",{
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${state.token}`
            }
        }).then(async(response)=>{
            const data = await response.json();
            if (!response.ok) {
                const error = data;
                return Promise.reject(error)
            }
            const totalTasks = data.tasks;
            dispatch({
                type: GET_TASKS_SUCCESS,
                payload: {totalTasks}
            })
        }).catch((error)=>{
            dispatch({
                type: GET_TASKS_ERROR,
                payload: {msg: error.msg}
            })
        })
        clearAlert();
    }

    //======================================UpdateTask=====================//
    const setUpdateTask = (id)=>{
        dispatch({
            type: SET_UPDATE_TASK_BEGIN,
            payload: {id}
        })
        console.log("Set update task") 

    }

    const updateTask = async (currentTask)=>{
        dispatch({type: UPDATE_TASK_BEGIN})
        await fetch(`https://task-manager-jw8c.onrender.com/api/v1/tasks/${state.taskId}`,{
            method: "PATCH",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${state.token}`
            },
            body: JSON.stringify(currentTask),
        }).then(async(response)=>{
            const data = await response.json();
            if(!response.ok){
                const error = data;
                return Promise.reject(error)
            }
            dispatch({
                type: UPDATE_TASK_SUCCESS,
                payload: {currentTask}
            })
            dispatch({type: CLEAR_VALUES})
        }).catch((error)=>{
            dispatch({
                type: UPDATE_TASK_ERROR,
                payload: {msg: error.msg}
            })
        })
        clearAlert();
        getTasks()
    } 
//=========================================DELETE TASK==========================//
    const deleteTask = async(id)=>{
        dispatch({type: DELETE_TASK_BEGIN})
        await fetch(`https://task-manager-jw8c.onrender.com/api/v1/tasks/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${state.token}`
            }
        }).then(async(response)=>{
            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                const error = data;
                return Promise.reject(error)
            }
            dispatch({type: DELETE_TASK_SUCCESS})
        }).catch((error)=>{
            dispatch({
                type: DELETE_TASK_ERROR,
                payload:{msg: error.msg}
            })
        })
        clearAlert()
        getTasks();
    }


    return <AppContext.Provider
        value={{
            ...state,
            initialState,
            displayAlert,
            clearAlert,
            signUpUser,
            loginUser,
            logoutUser,
            handleChange,
            clearValues,
            createTask,
            getTasks,
            setUpdateTask,
            updateTask,
            deleteTask,
        }}>
        {children}
    </AppContext.Provider>
}

const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, useAppContext, initialState }
















//======================= another method for register user=============================================//
    // const signUpUser = async (currentUser) => {
    //     dispatch({ type: REGISTER_USER_BEGIN })
    //     try {
    //         const response = await fetch("http://localhost:4000/api/v1/auth/register", {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(currentUser)
    //         })

    //         const data = await response.json()
    //         const { user, token } = data
    //         dispatch({
    //             type: REGISTER_USER_SUCCESS,
    //             payload: { user, token }
    //         })

    //     } catch (error) {
    //         console.log(error)
    //     }

    // }

//=--=-=-=-=-=-=-=-=-=-=-=-==========================--------------------------=---=-=--=-=-=-=-==-=-=--//