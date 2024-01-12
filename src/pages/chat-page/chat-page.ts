import Block from "../../core/Block";
import { InputWithLabel } from "../../components";
import { navigate } from "../../core/navigate";
import { chatslistData } from "../../components/chatslist/data";
import { popUpData, IpopUpData } from "../../components/popup/popup-data";
import { PopUp } from "../../components";
import { Modal } from "../../components";
import { ChatsList } from "../../components";
import { WindowHeader } from "../../components";

interface IProps {
    // inputValidateLogin: () => void;
    // inputValidatePass: () => void;
    // onLogin: (e: Event) => void;
    showClosePopup: (popup: string) => void;
    openModal: (e: Event) => void;
    closeUpPopup: () => void;
    chats: {
        title: string;
        text: string;
        messageFromOwner: boolean;
        time: string;
        messageNumber: number;
        activeClass?: string;
        id: string;
    }[];
    popUpData: IpopUpData;
    changeActiveChat: (id: string) => void;
}

type Refs = {
    windowheader: WindowHeader;
    chatlist: ChatsList;
    modal: Modal;
    popap: PopUp;
    [key: string]: PopUp | Modal | ChatsList | WindowHeader;
};

class ChatPage extends Block<IProps, Refs> {
    constructor(props: IProps) {
        super({
            ...props,
            chats: chatslistData.chats,
            popUpData: popUpData,

            showClosePopup: (popup: string) => {
                const popUp = this.refs[popup];
                if (popUp.isHidden()) {
                    popUp.setProps({ className: "" });
                } else {
                    popUp.setProps({ className: "popup-hidden" });
                }
            },
            closeUpPopup: () => {
                const popUp = this.refs.upPopUp;
                popUp.setProps({ className: "popup-hidden" });
            },
            openModal: (e) => {
                const target = e.target as HTMLElement;
                const data = target.dataset?.popap;
                if (data) {
                    if (data === "addUser") {
                        this.refs.modal.setProps({
                            title: "Добавить пользователя",
                            hiddenClass: "",
                            buttonText: "Добавить",
                        });
                    }
                    if (data === "deleteUser")
                        this.refs.modal.setProps({
                            title: "Удалить пользователя",
                            hiddenClass: "",
                            buttonText: "Удалить",
                        });
                }
                return;
            },
            changeActiveChat: (id) => {
                const newChats = this.props.chats.map((item) => {
                    if (item.id === id) {
                        this.refs.windowheader.setProps({
                            username: item.title,
                        });
                        return {
                            ...item,
                            activeClass: "chatslist-item__active",
                        };
                    } else {
                        return { ...item, activeClass: "" };
                    }
                });
                this.refs.chatlist.setProps({ chats: newChats });
            },
        });
    }

    protected render(): string {
        return `
        {{#>PageWrapper}}
             {{{Modal ref="modal" title="Добавить пользователя" hiddenClass="modal-hidden" buttonText="" closeUpPopup=closeUpPopup}}}
             {{#>LeftBar width="normal"}}
                    {{{LeftBarHeader}}}
                    <hr class="chatslist-line">
                    {{{ChatsList chats = chats ref="chatlist" changeActiveChat=changeActiveChat}}}
             {{/LeftBar}}
             {{#>MainWindow}}
                   {{{WindowHeader class=active.headerClass showClosePopup=showClosePopup username="Вадим" ref="windowheader"}}}
                   {{{MessageField}}}
                   {{{WindowFooter class=active.footerClass showClosePopup=showClosePopup}}}
                   {{{PopUp item = popUpData.upPopUp path=path text=text position="up" alt=alt ref="upPopUp" className="popup-hidden" openModal=openModal }}}
                   {{{PopUp item = popUpData.downPopUp path=path text=text position="down" alt=alt ref="downPopUp" className="popup-hidden"}}}         
             {{/MainWindow}}
        {{/PageWrapper}}
        `;
    }
}
export default ChatPage;
