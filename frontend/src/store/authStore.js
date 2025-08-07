import { create } from "zustand";
import { persist } from "zustand/middleware";
import { VITE_API_URL } from "../config/env";
import axios from "axios";

axios.defaults.withCredentials = true;

const api = `${VITE_API_URL}/auth`;
export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            isCheckingAuth: true,

            clearError: () => set({ error: null }),

            register: async (name, email, password) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axios.post(`${api}/register`, {
                        name,
                        email,
                        password,
                    });

                    set({
                        user: response.data.data,
                        isAuthenticated: false,
                        isLoading: false,
                        error: null,
                    });
                    return response.data;
                } catch (error) {
                    set({
                        error:
                            error.response?.data?.message ||
                            error.message ||
                            "Error Signing Up",
                        isLoading: false,
                    });
                    throw error;
                }
            },

            login: async (email, password) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axios.post(`${api}/login`, {
                        email,
                        password,
                    });

                    set({
                        user: response.data.data,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                    });
                    return response.data;
                } catch (error) {
                    set({
                        error:
                            error.response?.data?.message ||
                            error.message ||
                            "Invalid credentials",
                        isLoading: false,
                    });
                    throw error;
                }
            },

            logout: async () => {
                set({ isLoading: true, error: null });
                try {
                    await axios.post(`${api}/logout`);
                    set({
                        user: null,
                        isAuthenticated: false,
                        isLoading: false,
                        error: null,
                    });
                } catch {
                    // Even if logout fails on server, clear local state
                    set({
                        user: null,
                        isAuthenticated: false,
                        isLoading: false,
                        error: null,
                    });
                }
            },

            checkAuth: async () => {
                set({ isCheckingAuth: true, error: null });
                try {
                    const response = await axios.get(`${api}/me`);
                    set({
                        user: response.data.data,
                        isAuthenticated: true,
                        isCheckingAuth: false,
                        error: null,
                    });
                } catch {
                    set({
                        user: null,
                        isAuthenticated: false,
                        isCheckingAuth: false,
                        error: null,
                    });
                }
            },

            resendVerificationCode: async (email) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axios.post(`${api}/verify-email`, {
                        email,
                    });
                    set({
                        isLoading: false,
                        error: null,
                    });
                    return response.data;
                } catch (error) {
                    set({
                        error:
                            error.response?.data?.message ||
                            error.message ||
                            "Error sending verification email",
                        isLoading: false,
                    });
                    throw error;
                }
            },

            verifyEmail: async (code) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await axios.post(
                        `${api}/verify-email/confirm`,
                        {
                            code,
                        }
                    );
                    set({
                        user: response.data.data,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                    });
                    return response.data;
                } catch (error) {
                    set({
                        error:
                            error.response?.data?.message ||
                            error.message ||
                            "Error verifying email",
                        isLoading: false,
                    });
                    throw error;
                }
            },
        }),
        {
            name: "auth-storage", // unique name
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
