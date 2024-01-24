import Block from "../../core/Block";

interface IProps {}

type Ref = {};

export class Notification extends Block<IProps, Ref> {
    constructor(props: IProps) {
        super({
            ...props,
        });
    }

    protected render(): string {
        return `
           <div class="notification-wrapper">
               <h1 class="notification-title">{{title}}</h1>
               <span class="notification-text">{{text}}</span>
               {{{MainButton text="Назад к чатам" class="onlytext" mt="56px"}}}
           </div>
        `;
    }
}
