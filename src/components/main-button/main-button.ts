import Block from "../../core/Block";

interface IProps {
    mt: string;
    class: string;
    onClick: (e: Event) => void;
    events: {
        click: (e: Event) => void;
    };
}

type Ref = {
    // input: Input;
};

export class MainButton extends Block<IProps, Ref> {
    constructor(props: IProps) {
        super({
            ...props,
            events: { click: (e) => this.props.onClick(e) },
        });
    }

    protected render(): string {
        const { mt } = this.props;

        return `
             <button
                 ref="main-button"
                 class="main-button {{class}}"
                 style="margin-top: ${mt}"
             >{{text}}</button>
         `;
    }
}
