import Block from "../../core/Block";

interface IProps {}

type Ref = {
    // input: Input;
};

export class MainWindow extends Block<IProps, Ref> {
    constructor(props: IProps) {
        super({
            ...props,
        });
    }

    protected render(): string {
        return `
        <div class="main-window">
          {{> @partial-block }}
        </div>
         `;
    }
}
