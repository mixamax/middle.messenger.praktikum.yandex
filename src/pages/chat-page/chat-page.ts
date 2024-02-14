import Block from "../../core/Block";
// import { navigate } from "../../core/navigate";
// import { chatslistData } from "../../components/chatslist/data";
import { popUpData, IpopUpData } from "../../components/popup/popup-data";
import { PopUp } from "../../components";
import { Modal } from "../../components";
import { ChatsList } from "../../components";
import { WindowHeader } from "../../components";
import { MessageField } from "../../components";
import { createChat } from "../../services/chatService";
import { connect } from "../../../utils/connect";
import { addUserToChat, deleteUserFromChat } from "../../services/chatService";
import { User, Chat } from "../../type";
import { appStore } from "../../store/appStore";
import { createWebSocket } from "../../services/ws";

interface IProps {
    showClosePopup: (popup: string) => void;
    openModal: (e: Event) => void;
    closeUpPopup: () => void;
    chats: Chat[];
    popUpData: IpopUpData;
    changeActiveChat: (id: number) => void;
    // activeChatId: "none" | number;
    user: User;
    isOpenDialogChat: boolean;
    closeModal: () => void;
}

type Refs = {
    windowheader: typeof WindowHeader;
    chatlist: typeof ChatsList;
    modal: Modal;
    popap: PopUp;
    upPopUp: PopUp;
    downPopUp: PopUp;
    messageField: typeof MessageField;

    // [key: string]: PopUp ;
};

class ChatPage extends Block<IProps, Refs> {
    constructor(props: IProps) {
        super({
            ...props,
            popUpData: popUpData,
            showClosePopup: (popup: string) => {
                // const popUp = this.refs[popup];
                let popUp = this.refs.upPopUp;
                if (popup === "downPopUp") popUp = this.refs.downPopUp;
                if (popUp.isHidden()) {
                    popUp.setProps({ className: "" });
                } else {
                    popUp.setProps({ className: "popup-hidden" });
                }
            },
            //***********************************************closeUpPopup для закрытия менюшки верхней при закрытии модалки*/
            closeUpPopup: () => {
                const popUp = this.refs.upPopUp;
                if (popUp) popUp.setProps({ className: "popup-hidden" });
                return;
            },
            openModal: (e) => {
                const target = e.target as HTMLElement;
                const data = target.dataset?.popap;
                const dataButton = target.dataset?.profile;

                if (data) {
                    if (data === "addUser") {
                        this.refs.modal.setProps({
                            title: "Добавить пользователя",
                            hiddenClass: "",
                            buttonText: "Добавить",
                            labelTitle: "Логин",
                            placeholder: "Логин",
                            name: "login",
                            clickOnButton: () =>
                                this.addUserToChat(
                                    this.refs.modal,
                                    appStore.getState().activeChatId as number
                                ),
                        });
                    }
                    if (data === "deleteUser")
                        this.refs.modal.setProps({
                            title: "Удалить пользователя",
                            hiddenClass: "",
                            buttonText: "Удалить",
                            labelTitle: "Логин",
                            placeholder: "Логин",
                            name: "login",
                            clickOnButton: () =>
                                this.deleteUserFromChat(
                                    this.refs.modal,
                                    appStore.getState().activeChatId as number
                                ),
                        });
                }
                if (dataButton === "button") {
                    this.refs.modal.setProps({
                        title: "Название чата",
                        hiddenClass: "",
                        buttonText: "Добавить чат",
                        labelTitle: "Название чата",
                        placeholder: "Введите&nbspназвание&nbspчата",
                        name: "chatName",
                        clickOnButton: () => this.addChat(this.refs.modal),
                    });
                }
                return;
            },
            closeModal: () => {
                this.refs.modal.setProps({ hiddenClass: "modal-hidden" });
            },
            changeActiveChat: (id) => {
                // const newChats = this.props.chats.map((item) => {
                appStore.getState().chats.forEach((item) => {
                    if (item.id == id) {
                        const newChats = appStore
                            .getState()
                            .chats.map((chat) => {
                                if (chat.id === id) {
                                    const newChat = {
                                        ...chat,
                                        unread_count: 0,
                                        activeClass: "chatslist-item__active",
                                    };
                                    appStore.set({ activeChat: newChat });
                                    return newChat;
                                } else {
                                    return { ...chat, activeClass: "" };
                                }
                            });
                        appStore.set({ chats: newChats });
                        appStore.set({ activeChatId: id });
                        appStore.set({ activeChatTitle: item.title });
                        appStore.set({ isOpenDialogChat: true });

                        createWebSocket(
                            Number(appStore.getState().activeChatId),
                            Number(appStore.getState().user?.id)
                        );
                    }
                });
                // this.refs.chatlist.setProps({ chats: newChats });
            },
        });
    }

    deleteUserFromChat(modal: Modal, chatId: number) {
        if (!modal.getInputValueAndIsError().isError) {
            const login = modal.getInputValueAndIsError().value;
            console.log(login, chatId);
            if (login && chatId) {
                deleteUserFromChat({ login, chatId });
            }
        }
        console.log("пользователь не удален");
        return;
    }
    addUserToChat(modal: Modal, chatId: number) {
        if (!modal.getInputValueAndIsError().isError) {
            console.log("Логин:", modal.getInputValueAndIsError().value);
            const login = modal.getInputValueAndIsError().value;
            addUserToChat({ login, chatId });
            return;
        }
        console.log("пользователь не добавлен");
        return;
    }
    addChat(modal: Modal) {
        if (!modal.getInputValueAndIsError().isError) {
            console.log(
                "название чата:",
                modal.getInputValueAndIsError().value
            );
            createChat(modal.getInputValueAndIsError().value);
        }
        return;
    }

    protected render(): string {
        const userId = this.props.user?.id;
        const userLogin = this.props.user?.login;

        return `
        {{#>PageWrapper}}
             {{{Modal 
                 ref="modal" 
                 title="" 
                 hiddenClass="modal-hidden" 
                 buttonText="" 
                 closeUpPopup=closeUpPopup  
                 name=name 
                 errMsg="неправильное значение"
                 closeModal=closeModal
            }}}
             {{#>LeftBar width="normal"}}
                    {{{LeftBarHeader openModal=openModal}}}
                    <hr class="chatslist-line">
                    {{{ChatsList chats = chats ref="chatlist" changeActiveChat=changeActiveChat userLogin="${userLogin}"}}}
             {{/LeftBar}}
             {{#if ${!this.props.isOpenDialogChat}}}
             {{#>MainWindow ref="emptyWindow"}}
                {{>EmptyMainWindow}}
             {{/MainWindow}}
             {{/if}}
             {{#if ${this.props.isOpenDialogChat}}}
             {{#>MainWindow  ref="windowWithChat"}}
                   {{{WindowHeader class=active.headerClass showClosePopup=showClosePopup username="" ref="windowheader"}}}
                   {{{MessageField userId="${userId}" chatId="" ref="messageField"}}}
                   {{{WindowFooter class=active.footerClass showClosePopup=showClosePopup}}}
                   {{{PopUp item = popUpData.upPopUp path=path text=text position="up" alt=alt ref="upPopUp" className="popup-hidden" openModal=openModal }}}
                   {{{PopUp item = popUpData.downPopUp path=path text=text position="down" alt=alt ref="downPopUp" className="popup-hidden"}}}         
             {{/MainWindow}}
             {{/if}}
        {{/PageWrapper}}
        `;
    }
}
// export default ChatPage;
// export default connect((state) => state)(ChatPage);

export default connect((state) => ({
    // chats: state.chats,
    user: state.user,
    error: state.error,
    // activeChatId: state.activeChatId,
    // messages: state.messages,
    isOpenDialogChat: state.isOpenDialogChat,
}))(ChatPage);

// const initState: AppState = {
//     error: null,
//     user: null,
//     isOpenDialogChat: false,
//     chats: [],
//     messages: [],
//     activeChatId: "none",
// };
