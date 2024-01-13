import * as Pages from "../pages";

const pages = {
    login: Pages.LoginPage,
    auth: Pages.AuthPage,
    changePassPage: Pages.ChangePassPage,
    changeProfileDataPage: Pages.ChangeProfileDataPage,
    profilePage: Pages.ProfilePage,
    chatPage: Pages.ChatPage,
    page404: Pages.Page404,
    page500: Pages.Page500,
    pagesList: Pages.PagesList,
};

export function navigate(page: string) {
    const app = document.getElementById("app")!;

    //@ts-ignore
    const Component = pages[page];
    const component = new Component();

    app.innerHTML = "";
    app.append(component.getContent()!);
}
