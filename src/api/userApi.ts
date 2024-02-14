import { HTTPTransport } from "../core/httpTransport";
import { APIError } from "./type";
import { ChangePassData, ChangeProfileData, User } from "../type";

const userApi = new HTTPTransport();

export default class UserApi {
    async searchUserByLogin(data: object): Promise<User[] | APIError> {
        const XMLHttpRequest = (await userApi.post("/user/search", {
            headers: {
                "content-type": "application/json",
                credentials: "include",
                mode: "cors",
            },
            data: JSON.stringify(data),
        })) as XMLHttpRequest;
        const user = XMLHttpRequest.response;

        return JSON.parse(user);
    }
    async changeUserProfile(data: ChangeProfileData): Promise<User | APIError> {
        const XMLHttpRequest = (await userApi.put("/user/profile", {
            headers: {
                "content-type": "application/json",
                credentials: "include",
                mode: "cors",
            },
            data: JSON.stringify(data),
        })) as XMLHttpRequest;
        const user = XMLHttpRequest.response;

        return JSON.parse(user);
    }
    async changeUserPass(data: ChangePassData): Promise<string | APIError> {
        const XMLHttpRequest = (await userApi.put("/user/password", {
            headers: {
                "content-type": "application/json",
                credentials: "include",
                mode: "cors",
            },
            data: JSON.stringify(data),
        })) as XMLHttpRequest;
        const response = XMLHttpRequest.response;
        if (response === "Ok") return response;
        return JSON.parse(response);
    }

    async changeUserAvatar(data: FormData): Promise<User | APIError> {
        const XMLHttpRequest = (await userApi.put("/user/profile/avatar", {
            headers: {
                // "content-type": "multipart/form-data",
                credentials: "include",
                mode: "cors",
            },
            data,
        })) as XMLHttpRequest;
        const user = XMLHttpRequest.response;

        return JSON.parse(user);
    }
}
