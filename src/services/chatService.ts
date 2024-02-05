import ChatApi from "../api/chatApi";
import UserApi from "../api/userApi";
import { appStore } from "../store/appStore";
import { AddDeleteUsers } from "../api/type";
import { User } from "../type";
// import { transformChats } from "../utils/apiTransformers";

const chatApi = new ChatApi();
const userApi = new UserApi();

const getChats = async () => {
    const responseChat = await chatApi.getChats();
    if (
        responseChat &&
        typeof responseChat === "object" &&
        "reason" in responseChat
    ) {
        throw Error(responseChat.reason);
    }
    return responseChat;
};

const createChat = async (title: string) => {
    const response = await chatApi.createChat({ title });
    if (response && typeof response === "object" && "reason" in response) {
        throw Error(response.reason);
    }
    console.log("createChat", response);
    const responseChat = await chatApi.getChats();
    if (
        responseChat &&
        typeof responseChat === "object" &&
        "reason" in responseChat
    ) {
        throw Error(responseChat.reason);
    }
    console.log("createChat", responseChat);
    appStore.set({ chats: responseChat });
};

const addUserToChat = async (data: { login: string; chatId: number }) => {
    const response = await userApi.searchUserByLogin({ login: data.login });
    if (response && typeof response === "object" && "reason" in response) {
        throw Error(response.reason);
    }
    const user = response as User[];
    const userId = user[0].id;
    const responseAddUser = await chatApi.addUsersToChat({
        users: [userId],
        chatId: data.chatId,
    });
    if (
        responseAddUser &&
        typeof responseAddUser === "object" &&
        "reason" in responseAddUser
    ) {
        throw Error(responseAddUser.reason);
    }
    return responseAddUser;
};
const deleteUserFromChat = async (data: { login: string; chatId: number }) => {
    const response = await userApi.searchUserByLogin({ login: data.login });
    if (response && typeof response === "object" && "reason" in response) {
        throw Error(response.reason);
    }
    const user = response as User[];
    const userId = user[0].id;
    const responseDeleteUser = await chatApi.deleteUsersFromChat({
        users: [userId],
        chatId: data.chatId,
    });
    if (
        responseDeleteUser &&
        typeof responseDeleteUser === "object" &&
        "reason" in responseDeleteUser
    ) {
        throw Error(responseDeleteUser.reason);
    }
    return responseDeleteUser;
};

export { createChat, getChats, addUserToChat, deleteUserFromChat };
