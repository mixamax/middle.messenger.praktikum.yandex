import { HTTPTransport } from "../core/httpTransport";
import { Chat } from "../type";
import { APIError, CreateChat, AddDeleteUsers } from "./type";

export type TokenResponse = {
    token: string;
};

const chatApi = new HTTPTransport();

export default class ChatApi {
    async createChat(data: CreateChat): Promise<void | APIError> {
        const chat = chatApi.post("/chats", {
            headers: {
                "content-type": "application/json",
                credentials: "include",
                mode: "cors",
            },
            data: JSON.stringify(data),
        }) as Promise<void | APIError>;
        return chat;
    }

    // ****************************************************************** добавил response и parse
    async getChats(): Promise<Chat[] | APIError> {
        const XMLHttpRequest = (await chatApi.get("/chats")) as XMLHttpRequest;
        const chats = XMLHttpRequest.response;

        return JSON.parse(chats);
    }

    async addUsersToChat(data: AddDeleteUsers): Promise<void | APIError> {
        const result = (await chatApi.put("/chats/users", {
            headers: {
                "content-type": "application/json",
                credentials: "include",
                mode: "cors",
            },
            data: JSON.stringify(data),
        })) as Promise<void | APIError>;

        return result;
    }

    async deleteUsersFromChat(data: AddDeleteUsers): Promise<void | APIError> {
        const result = (await chatApi.delete("/chats/users", {
            data,
        })) as Promise<void | APIError>;

        return result;
    }
    async getChatToken(id: number): Promise<TokenResponse | APIError> {
        const XMLHttpRequest = (await chatApi.post(
            `/chats/token/${id}`,
            {}
        )) as XMLHttpRequest;
        const response = XMLHttpRequest.response;

        return JSON.parse(response);
    }
}
