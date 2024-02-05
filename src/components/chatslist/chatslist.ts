import Block from "../../core/Block";
import { ChatsListItem } from "..";
import { connect } from "../../../utils/connect";
import { appStore } from "../../store/appStore";

interface IProps {
    chats: {
        id: string;
        title: string;
        text: string;
        messageFromOwner: boolean;
        unread_count: number;
        activeClass?: string;
        last_message?: {
            user: {
                first_name: string;
                second_name: string;
                avatar: string;
                email: string;
                login: string;
                phone: string;
            };
            time: string;
            content: string;
        };
    }[];
    userLogin: string;
    onClick: (id: string) => void;
    changeActiveChat: (id: string) => void;
}

type Ref = {
    listitem: ChatsListItem;
};

class ChatsList extends Block<IProps, Ref> {
    constructor(props: IProps) {
        super({
            ...props,
            onClick: (id) => this.props.changeActiveChat(id),
        });
    }

    protected render(): string {
        const ownerLogin = this.props.userLogin;
        const chats = appStore.getState().chats;

        return `
        <ul class="chatslist">
         ${chats
             .map(
                 (item) =>
                     `{{{ChatsListItem 
                      id=${item.id}
                      title="${item.title}"
                      text="${item.last_message?.content || ""}"
                      activeClass= "${item.activeClass || ""}"
                      messageFromOwner=${
                          ownerLogin == item.last_message?.user.login
                      }
                      messageNumber="${item.unread_count}"
                      time="${getTime(item.last_message?.time) || ""}"
                      onClick=onClick
                      ref="listitem"
                     }}}
                     <hr class="chatslist-line" />`
             )
             .join(" ")}
        </ul>
         `;
    }
}

function getTime(str: string | undefined) {
    if (str === undefined) return undefined;
    const date = new Date(Date.parse(str));
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
}

export default connect((state) => ({
    chats: state.chats,
    // activeChatId: state.activeChatId,
}))(ChatsList);
