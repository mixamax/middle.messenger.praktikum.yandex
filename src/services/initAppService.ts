import { getUser } from "../services/authService";
import router, { PathName } from "../core/router";
import { appStore } from "../store/appStore";
import { getChats } from "./chatService";

const initAppService = async () => {
    // console.log("***************INIT_APP_SERVICE***************");

    let userInfo = null;
    try {
        userInfo = await getUser();
    } catch (error) {
        if (window.location.pathname === "/sign-up") {
            router.go("/sign-up");
        } else {
            router.go("/");
        }

        return;
    }
    appStore.set({ user: userInfo });

    initChats();

    if (userInfo && window.location.pathname === "/") {
        router.go("/messanger");
    } else if (userInfo && window.location.pathname === "/sign-up") {
        router.go("/404");
    } else {
        // window.history.pushState({}, "", "/");
        router.go(window.location.pathname as PathName);
    }
};

const initChats = async () => {
    try {
        let chats = await getChats();
        if (!chats) return;
        const activeChatId = appStore.getState().activeChatId;

        if (activeChatId !== "none") {
            const newChats = chats.map((chat) => {
                if (Number(chat.id) == activeChatId) {
                    const newChat = {
                        ...chat,
                        activeClass: "chatslist-item__active",
                    };
                    appStore.set({ activeChat: newChat });
                    return newChat;
                } else {
                    return { ...chat, activeClass: "" };
                }
            });

            chats = newChats;
        }

        appStore.set({ chats });
        // console.log("поместили в стор новые чаты");
    } catch (error) {
        router.go("/500");
        console.log(error);
        return;
    }
};

export { initAppService, initChats };
