import { HTTPTransport } from "../core/httpTransport";
import { User } from "../type";
import { APIError, CreateUser, LoginRequestData, SignUpResponse } from "./type";

const authApi = new HTTPTransport();

export default class AuthApi {
    async create(data: CreateUser): Promise<SignUpResponse | APIError> {
        const signup = authApi.post("/auth/signup", {
            headers: {
                "content-type": "application/json",
                credentials: "include",
                mode: "cors",
            },
            data: JSON.stringify(data),
        }) as Promise<SignUpResponse>;
        return signup;
    }

    async login(data: LoginRequestData): Promise<void | APIError> {
        console.log(JSON.stringify(data));
        const signin = authApi.post("/auth/signin", {
            headers: {
                "content-type": "application/json",
                credentials: "include",
                mode: "cors",
            },
            data: JSON.stringify(data),
        }) as Promise<void | APIError>;
        return signin;
    }

    async getUserInfo(): Promise<User | APIError> {
        const XMLHttpRequest = (await authApi.get(
            "/auth/user"
        )) as XMLHttpRequest;
        const userInfo = XMLHttpRequest.response;

        return JSON.parse(userInfo) as Promise<User | APIError>;
    }

    async logout(): Promise<void | APIError> {
        return authApi.post("/auth/logout") as Promise<void | APIError>;
    }
}
