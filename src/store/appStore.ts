import { AppState } from "../type";
import { createStore } from "../core/Store";

const initState: AppState = {
    error: null,
    user: null,
    isOpenDialogChat: false,
    chats: [],
    messages: [],
    activeChatId: "none",
    activeChat: null,
    activeChatTitle: "",
};

export const appStore = createStore<AppState>(initState);
