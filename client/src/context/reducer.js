import {initialState} from './appContext.js'
import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR, 
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
 const reducer = (state, action)=>{
    if (action.type === DISPLAY_ALERT) {
        return{
            ...state,
            showAlert: true,
            alertMsg:action.payload.msg,
            alertType:action.payload.type,
        }
    }
    if (action.type === CLEAR_ALERT) {
        return{
            ...state,
            showAlert:false,
            alertMsg:"",
            alertType:"",
        }
    }
    if (action.type === REGISTER_USER_BEGIN) {
        return{
            ...state,
            isLoading: true,
        }
    }
    if (action.type === REGISTER_USER_SUCCESS) {
        return{
            ...state,
            isLoading: false,
            showAlert: true,
            alertMsg: "User created! Redirecting...",
            alertType: "success",
            user: action.payload.user,
            token: action.payload.token,
        }
    }
    if (action.type === REGISTER_USER_ERROR) {
        return{
            ...state,
            isLoading: false,
            showAlert: true, 
            alertMsg: action.payload.msg,
            alertType:"danger"
        }
    }
    if (action.type === LOGIN_USER_BEGIN) {
        return{
            ...state,
            isLoading: true,
        }
    }
    if (action.type === LOGIN_USER_SUCCESS) {
        return{
            ...state,
            isLoading: false,
            showAlert: true, 
            alertMsg:"Logged in successfully! Redirecting...",
            alertType: "success",
            user: action.payload.user,
            token: action.payload.token,
        }
    }
    if (action.type === LOGIN_USER_ERROR) {
        return{
            ...state,
            isLoading: false,
            showAlert: true, 
            alertMsg: action.payload.msg,
            alertType:"danger"
        }
    }
    if(action.type === LOGOUT_USER){
        return{
            ...initialState,
            user: null,
            token: null
        }
    }
    if (action.type === HANDLE_CHANGE) {
        return{
            ...state,
            [action.payload.name]: action.payload.value
        }
    }
    if (action.type === CLEAR_VALUES) {
       return{
        ...state,
        description: "",
       }
    }
    if (action.type === CREATE_TASK_BEGIN) {
        return{
            ...state,
            isLoading: true,
            
        }
    }
    if (action.type === CREATE_TASK_SUCCESS) {
        return{
            ...state,
            isLoading: false,
            showAlert: true,
            description: action.payload.currentTask,
            alertMsg: "Task created successfully",
            alertType:"success"

        }
    }
    if (action.type === CREATE_TASK_ERROR) {
        return{
            ...state,
            isLoading: false,
            showAlert: true,
            alertMsg: action.payload.msg,
            alertType:"danger"

        }
    }
    if(action.type === GET_TASKS_BEGIN){
        return{
            ...state,
            isLoading: true
        }
    }
    if(action.type === GET_TASKS_SUCCESS){
        return{
            ...state,
            isLoading: false, 
            tasks: action.payload.totalTasks,
        }

    }
    if(action.type === GET_TASKS_ERROR){
        return{
            ...state,
            isLoading: false,
            showAlert: true,
            alertMsg: action.payload.msg,
            alertType:"danger"
        }

    }
    if(action.type === SET_UPDATE_TASK_BEGIN){
        const task = state.tasks.find((task)=> task._id === action.payload.id);
        const { _id, description }= task
        return{
            ...state,
            isEditing: true,
            taskId: _id,
            description,
        }
    }
    if(action.type === UPDATE_TASK_BEGIN){
        return{
            ...state,
            isLoading: true
        }
    }
    if(action.type === UPDATE_TASK_SUCCESS){
        return{
            ...state,
            isLoading: false,
            description: action.payload.currentTask,
            showAlert:true,
            alertMsg:"Task updated successfully",
            alertType:"success",
            isEditing: false

        }
    }
    if(action.type === UPDATE_TASK_ERROR){
        return{
            ...state,
            isLoading: false,
            showAlert: true,
            alertMsg: action.payload.msg,
            alertType:"danger",
            isEditing: false
        }
    }

    if (action.type === DELETE_TASK_BEGIN) {
        return{
            ...state,
            isLoading: true
        }
    }
    if (action.type === DELETE_TASK_SUCCESS) {
        return{
            ...state,
            isLoading: false,
            showAlert: true,
            alertMsg: "Task deleted Successfully",
            alertType:"success"
        }
    }
    if (action.type === DELETE_TASK_ERROR) {
        return{
            ...state,
            isLoading: false,
            showAlert: true,
            alertMsg: action.payload.msg,
            alertType:"danger"

        }
    }


    throw new Error(`No such action: ${action.type}`)
 }

 export default reducer