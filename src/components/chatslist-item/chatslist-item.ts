import Block from "../../core/Block";

interface IProps {
    events: {
        click: (e: Event) => void;
    };
    onClick: (e: Event, id: string) => void;
    id: string;
}

type Ref = {
    item: HTMLLIElement;
};

export class ChatsListItem extends Block<IProps, Ref> {
    constructor(props: IProps) {
        super({
            ...props,
            events: { click: (e) => this.props.onClick(e, this.getId()) },
        });
    }
    public getId() {
        return this.refs.item.id;
    }

    protected render(): string {
        const { id } = this.props;
        return `
            
                 <li id="${id}" class="chatslist-item {{activeClass}}" ref="item">
                     <div class="chatslist-item__avatar">
                         <img src="/images/avatar-sceleton.svg" alt="аватарка" />
                     </div>
                     <div class="chatslist-item__description">
                          <h4 class="chatslist-item__title">{{title}}</h4>
                          <p class="chatslist-item__lasttext">
                              {{#if messageFromOwner}}
                                 <span
                                      class="chatslist-item__lasttext chatslist-item__lasttext__darktext"
                                 >Вы:</span>
                              {{/if}}
                          {{text}}</p>
                     </div>
                     <div class="chatslist-item__timeinfo">
                         <span class="chatslist-item__time">{{time}}</span>
                         {{#if messageNumber}}
                              <div class="chatslist-item__number">{{messageNumber}}</div>
                         {{/if}}
    
                     </div>
                </li>
                <hr class="chatslist-line" />
           
         `;
    }
}
