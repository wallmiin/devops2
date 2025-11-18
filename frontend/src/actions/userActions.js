/* AXIOS CONFIG */
import API from "../axiosConfig";

/* ACTION TYPES */
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../constants/userConstants";

import { ORDER_LIST_MY_RESET } from "../constants/orderConstants";


// =====================================================
// 🔥 LOGIN
// =====================================================
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await API.post(
      "/api/users/login/",
      { username: email, password: password },
      { headers: { "Content-Type": "application/json" } }
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response?.data?.detail || error.message,
    });
  }
};


// =====================================================
// 🔥 LOGOUT
// =====================================================
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");

  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
  dispatch({ type: USER_LIST_RESET });
};


// =====================================================
// 🔥 REGISTER
// =====================================================
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const { data } = await API.post(
      "/api/users/register/",
      { name, email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response?.data?.detail || error.message,
    });
  }
};


// =====================================================
// 🔥 USER DETAILS (PROFILE OR ADMIN)
// =====================================================
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await API.get(`/api/users/${id}/`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response?.data?.detail || error.message,
    });
  }
};


// =====================================================
// 🔥 UPDATE USER PROFILE
// =====================================================
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await API.put(`/api/users/profile/update/`, user, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response?.data?.detail || error.message,
    });
  }
};


// =====================================================
// 🔥 ADMIN — LIST USERS
// =====================================================
export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await API.get(`/api/users/`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: error.response?.data?.detail || error.message,
    });
  }
};


// =====================================================
// 🔥 ADMIN — DELETE USER
// =====================================================
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    await API.delete(`/api/users/delete/${id}/`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: error.response?.data?.detail || error.message,
    });
  }
};


// =====================================================
// 🔥 ADMIN — UPDATE USER
// =====================================================
export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await API.put(
      `/api/users/update/${user._id}/`,
      user,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({ type: USER_UPDATE_SUCCESS });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response?.data?.detail || error.message,
    });
  }
};
