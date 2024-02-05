import ChatApi from "../api/chatApi";
import { initChats } from "./initAppService";
import { appStore } from "../store/appStore";

const chatApi = new ChatApi();

export const createWebSocket = async (chatId: number, userId: number) => {
    const response = await chatApi.getChatToken(chatId);
    if (response && typeof response === "object" && "reason" in response) {
        throw Error(response.reason);
    }
    const token = response.token;
    const sendBtn = document.querySelector(
        ".window-footer-button"
    ) as HTMLButtonElement;
    const input = document.querySelector(
        ".window-footer-searchline"
    ) as HTMLInputElement;

    if (!sendBtn) return;

    const socket = new WebSocket(
        `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
    );

    socket.addEventListener("open", () => {
        console.log("Соединение установлено");
        socket.send(
            JSON.stringify({
                content: "0",
                type: "get old",
            })
        );

        sendBtn.addEventListener("click", buttonHandler);
    });

    function buttonHandler() {
        socket.send(
            JSON.stringify({
                content: input.value,
                type: "message",
            })
        );
    }

    socket.addEventListener("close", (event) => {
        if (event.wasClean) {
            console.log("Соединение закрыто чисто");
        } else {
            console.log("Обрыв соединения");
        }

        console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    socket.addEventListener("message", (event) => {
        const data = JSON.parse(event.data);

        if (Array.isArray(data)) {
            appStore.set({ messages: data.reverse() });
        } else {
            if (data) {
                const message = data;
                const newMessages = [...appStore.getState().messages];
                newMessages.push(message);
                appStore.set({ messages: newMessages });
                initChats();
            }
        }
    });

    socket.addEventListener("error", (event) => {
        console.log("Ошибка", event);
    });
};
