export const SERVER_URL = process.env.NODE_ENV === 'production' ? "https://mmm-backend.herokuapp.com:4000" : "http://localhost:4000";
export const SOCKET_URL = process.env.NODE_ENV === 'production' ? "wss://mmm-backend.herokuapp.com:4000" : "ws://localhost:4000";

export const LOCALSTORAGE_TOKEN = "auth-token"