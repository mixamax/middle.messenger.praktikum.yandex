import UserApi from "../api/userApi";
import router from "../core/router";
// import { ChangePassPage } from "../pages";
import { appStore } from "../store/appStore";
import { ChangePassData, ChangeProfileData } from "../type";

const userApi = new UserApi();

const changeUserProfile = async (data: ChangeProfileData) => {
    const response = await userApi.changeUserProfile(data);
    if (response && typeof response === "object" && "reason" in response) {
        throw Error(response.reason);
    }

    console.log("changedUserProfile", response);
    appStore.set({ user: response });
};

const changeUserPass = async (data: ChangePassData) => {
    const response = await userApi.changeUserPass(data);

    if (response && typeof response === "object" && "reason" in response) {
        throw Error(response.reason);
    }
    router.go("/settings");
};

const changeUserAvatar = async (data: FormData) => {
    const response = await userApi.changeUserAvatar(data);
    if (response && typeof response === "object" && "reason" in response) {
        throw Error(response.reason);
    }

    console.log("changeUserAvatar", response);
    appStore.set({ user: response });
};

export { changeUserProfile, changeUserPass, changeUserAvatar };
