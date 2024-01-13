import Block from "../../core/Block";
import { ChatsListItem } from "..";

interface IProps {
    chats: {
        id: string;
        title: string;
        text: string;
        messageFromOwner: boolean;
        time: string;
        messageNumber: number;
        activeClass?: string;
    }[];
    onClick: (id: string) => void;
    changeActiveChat: (id: string) => void;
}

type Ref = {
    listitem: ChatsListItem;
};

export class ChatsList extends Block<IProps, Ref> {
    constructor(props: IProps) {
        super({
            ...props,
            onClick: (id) => this.props.changeActiveChat(id),
        });
    }

    protected render(): string {
        const { chats } = this.props;
        return `
        <ul class="chatslist">
         ${chats
             .map(
                 (item) =>
                     `{{{ChatsListItem 
                      id=${item.id}
                      title="${item.title}"
                      text="${item.text}"
                      activeClass= "${item.activeClass || ""}"
                      messageFromOwner="${item.messageFromOwner}"
                      messageNumber="${item.messageNumber}"
                      time="${item.time}"
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
