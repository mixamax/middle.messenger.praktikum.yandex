import AuthApi from "../api/authApi";
import { CreateUser, LoginRequestData } from "../api/type";
import { appStore } from "../store/appStore";
import router from "../core/router";
import { initAppService } from "./initAppService";
// import { transformUser } from "../utils/apiTransformers";

const authApi = new AuthApi();

const getUser = async () => {
    try {
        const responseUser = await authApi.getUserInfo();
        if (
            responseUser &&
            typeof responseUser === "object" &&
            "reason" in responseUser
        ) {
            throw Error(responseUser.reason);
        }
        return responseUser;
    } catch (error) {
        router.go("/500");
        console.log(error);
        return;
    }
};

const signin = async (data: LoginRequestData) => {
    try {
        const response = await authApi.login(data);
        if (response && typeof response === "object" && "reason" in response) {
            throw Error(response.reason);
        }
        initAppService();
        router.go("/messanger");
    } catch (error) {
        router.go("/500");
        console.log(error);
        return;
    }
};

const signup = async (data: CreateUser) => {
    try {
        const response = await authApi.create(data);
        console.log(response);
        if (response && typeof response === "object" && "reason" in response) {
            throw Error(response.reason);
        }

        const userInfo = await getUser();
        console.log(userInfo);

        appStore.set({ user: userInfo });
        router.go("/messanger");
    } catch (error) {
        router.go("/500");
        console.log(error);
        return;
    }
};

const logout = async () => {
    try {
        await authApi.logout();
        appStore.set({ user: null, chats: [] });
        router.go("/");
    } catch (error) {
        router.go("/500");
        console.log(error);
        return;
    }
};

export { signin, signup, logout, getUser };
