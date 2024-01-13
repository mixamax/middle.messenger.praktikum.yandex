import Block from "../../core/Block";

interface IProps {
    color: string;
    text: string;
    onClick: (e: Event) => void;
    events: {
        click: (e: Event) => void;
    };
}

type Ref = {};

export class ChangeDataItem extends Block<IProps, Ref> {
    constructor(props: IProps) {
        super({
            ...props,
            events: { click: (e) => this.props.onClick(e) },
        });
    }

    protected render(): string {
        const { color, text } = this.props;

        return `
        <div class="dataChangeForm-wrapper">
             <button
                  class="dataChangeForm-button dataChangeForm-button__${color}"
             >${text}</button>
        </div>
         `;
    }
}
