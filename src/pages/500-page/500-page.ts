import Block from "../../core/Block";

interface IProps {}

type Refs = {};

class Page500 extends Block<IProps, Refs> {
    constructor(props: IProps) {
        super({
            ...props,
        });
    }

    protected render(): string {
        return `
        {{#>PageWrapper}}
        {{{Notification title="500" text="Мы уже фиксим"}}}
        {{/PageWrapper}}
        `;
    }
}
export default Page500;
