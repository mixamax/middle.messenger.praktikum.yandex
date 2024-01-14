import Block from "../../core/Block";

interface IProps {
    // mt: string;
    // class: string;
    // onClick: (e: Event) => void;
    showClosePopup: (popUp: string) => void;
    events: {
        click: (e: Event) => void;
    };
    username: string;
}

type Ref = {
    // input: Input;
};

export class WindowHeader extends Block<IProps, Ref> {
    constructor(props: IProps) {
        super({
            ...props,
            events: {
                click: (e) => {
                    const target = e.target as HTMLElement;
                    const data = target.dataset?.click;
                    if (data === "circle-header-bar")
                        this.props.showClosePopup("upPopUp");
                },
            },
        });
    }

    // public value() {
    //     return this.refs.input.value();
    // }

    protected render(): string {
        return `
    <div class="window-header">
        <div class="window-header-user">
            <img
                src="/images/avatar-sceleton.svg"
                alt="аватарка"
                width="34px"
                height="34px"
            />
            <span class="window-header-username">{{username}}</span>
        </div>
        <div  data-click="circle-header-bar" class="window-header-bar {{class}}">
            <svg
                data-click="circle-header-bar"
                width="3"
                height="16"
                viewBox="0 0 3 16"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="Group 194" class="bar-circle" click-data="circle-header-bar">
                    <circle data-click="circle-header-bar" id="Ellipse 20" cx="1.5" cy="2" r="1.5" />
                    <circle data-click="circle-header-bar" id="Ellipse 21" cx="1.5" cy="8" r="1.5" />
                    <circle data-click="circle-header-bar" id="Ellipse 22" cx="1.5" cy="14" r="1.5" />
                </g>
            </svg>
        </div>
    </div>
         `;
    }
}
