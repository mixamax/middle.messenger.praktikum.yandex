import Block from "../../core/Block";

interface IProps {}

type Refs = {};

class Page404 extends Block<IProps, Refs> {
    constructor(props: IProps) {
        super({
            ...props,
        });
    }

    protected render(): string {
        return `
          {{#>PageWrapper}}
          {{{Notification title="404" text="Не туда попали"}}}
          {{/PageWrapper}}
        `;
    }
}
export default Page404;
