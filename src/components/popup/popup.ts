import Block from "../../core/Block";

interface IProps {
    openModal: (e: Event) => void;
    events: {
        click: (e: Event) => void;
    };
    className: string;
}

type Ref = {
    popUp: HTMLInputElement;
};

export class PopUp extends Block<IProps, Ref> {
    constructor(props: IProps) {
        super({
            ...props,
            events: { click: (e) => this.props.openModal(e) },
        });
    }

    public isHidden() {
        return Array.from(this.refs.popUp.classList).includes("popup-hidden");
    }

    protected render(): string {
        return `
             <div ref="popUp" class="popup-message-{{position}} {{className}}">
                 <div class="popup">
                     {{#each item}}
                         <div data-popap={{data}} class="popup-item">
                             <img data-popap={{data}} src={{path}} alt={{alt}} />
                             <span data-popap={{data}} class="popup-item__text">{{text}}</span>
                         </div>
                     {{/each}}
                 </div>
             </div>
         `;
    }
}
