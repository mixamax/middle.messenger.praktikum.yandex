import Block from "../../core/Block";
import router from "../../core/router";

interface IProps {
    onClick: (e: Event) => void;
    events: {
        click: (e: Event) => void;
    };
}

type Ref = {};

export class LeftBarBackButton extends Block<IProps, Ref> {
    constructor(props: IProps) {
        super({
            ...props,
            events: {
                click: (e) => {
                    this.props.onClick(e);
                },
            },
        });
    }

    protected render(): string {
        return `
    <button class="leftbar-backbutton">
        <img src="/images/arrow-footer-icon.svg" alt="стрелка_влево" />
    </button>
         `;
    }
}
