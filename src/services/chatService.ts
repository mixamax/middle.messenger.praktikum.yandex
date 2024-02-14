import ChatApi from "../api/chatApi";
import UserApi from "../api/userApi";
import router from "../core/router";
import { appStore } from "../store/appStore";
import { User } from "../type";

const chatApi = new ChatApi();
const userApi = new UserApi();

const getChats = async () => {
    try {
        const responseChat = await chatApi.getChats();
        if (
            responseChat &&
            typeof responseChat === "object" &&
            "reason" in responseChat
        ) {
            throw Error(responseChat.reason);
        }
        return responseChat;
    } catch (error) {
        router.go("/500");
        console.log(error);
        return;
    }
};

const createChat = async (title: string) => {
    try {
        const response = await chatApi.createChat({ title });
        if (response && typeof response === "object" && "reason" in response) {
            throw Error(response.reason);
        }
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
    } catch (error) {
        router.go("/500");
        console.log(error);
        return;
    }
};

const addUserToChat = async (data: { login: string; chatId: number }) => {
    try {
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
    } catch (error) {
        router.go("/500");
        console.log(error);
        return;
    }
};
const deleteUserFromChat = async (data: { login: string; chatId: number }) => {
    try {
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
    } catch (error) {
        router.go("/500");
        console.log(error);
        return;
    }
};

export { createChat, getChats, addUserToChat, deleteUserFromChat };
