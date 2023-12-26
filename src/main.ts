import "./style.css";
import Handlebars from "handlebars";
import * as Pages from "./pages";
import * as Components from "./components";
import { chatslistData } from "./components/chatslist/data";

const popUpData = {
    active: {
        headerClass: "window-header-bar__activ ",
        footerClass: "window-footer-bar__activ ",
    },
    popUp: {
        upPopUp: [
            {
                path: "/images/add-icon.svg",
                text: "Добавить пользователя",
                alt: "плюс",
            },
            {
                path: "/images/delete-icon.svg",
                text: "Удалить пользователя",
                alt: "крест",
            },
        ],
        downPopUp: [
            {
                path: "/images/media-icon-blue.svg",
                text: "Фото или Видео",
                alt: "иконка_медиа",
            },
            {
                path: "/images/file-icon.svg",
                text: "Файл",
                alt: "иконка_файла",
            },
            {
                path: "/images/location-icon.svg",
                text: "Локация",
                alt: "иконка_локации",
            },
        ],
    },
};
const modal = { modal: true };

const pages = {
    login: [Pages.LoginPage],
    auth: [Pages.AuthPage],
    chatPage: [Pages.ChatPage, { ...chatslistData }],
    chatPageWithPopUp: [Pages.ChatPage, { ...chatslistData, ...popUpData }],
    chatPageWithModal: [
        Pages.ChatPage,
        { ...chatslistData, ...popUpData, ...modal },
    ],
    pagesList: [Pages.PagesList],
    profilePage: [Pages.ProfilePage],
    changePassPage: [Pages.ChangePassPage],
    changeProfileDataPage: [Pages.ChangeProfileDataPage],
    page404: [Pages.Page404],
    page500: [Pages.Page500],
};

Object.entries(Components).forEach(([name, component]) =>
    Handlebars.registerPartial(name, component)
);

function navigate(page: string) {
    //@ts-ignore
    const [source, context] = pages[page];
    const container = document.getElementById("app");
    container!.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener("DOMContentLoaded", () => navigate("pagesList"));
document.addEventListener("click", (e) => {
    //@ts-ignore
    const page = e.target.getAttribute("id");
    if (page) {
        navigate(page);
        e.preventDefault();
        e.stopImmediatePropagation();
    }
});
