import AuthApi from "../api/authApi";
import { CreateUser, LoginRequestData } from "../api/type";
import { appStore } from "../store/appStore";
import router from "../core/router";
import { initAppService } from "./initAppService";
// import { transformUser } from "../utils/apiTransformers";

const authApi = new AuthApi();

const getUser = async () => {
    const responseUser = await authApi.getUserInfo();
    if (
        responseUser &&
        typeof responseUser === "object" &&
        "reason" in responseUser
    ) {
        throw Error(responseUser.reason);
    }
    return responseUser;
};

const signin = async (data: LoginRequestData) => {
    const response = await authApi.login(data);
    if (response && typeof response === "object" && "reason" in response) {
        throw Error(response.reason);
    }

    // const userInfo = await getUser();

    // appStore.set({ user: userInfo });
    initAppService();
    router.go("/messanger");
};

const signup = async (data: CreateUser) => {
    const response = await authApi.create(data);
    console.log(response);
    if (response && typeof response === "object" && "reason" in response) {
        throw Error(response.reason);
    }

    const userInfo = await getUser();
    console.log(userInfo);

    appStore.set({ user: userInfo });
    router.go("/messanger");
};

const logout = async () => {
    await authApi.logout();
    appStore.set({ user: null, chats: [] });
    router.go("/");
};

export { signin, signup, logout, getUser };
