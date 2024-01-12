import Block from "../../core/Block";

interface IProps {}

type Ref = {};

export class ProfileDataItem extends Block<IProps, Ref> {
    constructor(props: IProps) {
        super({
            ...props,
        });
    }

    protected render(): string {
        return `
            <div class="profile-data-item__wrapper">
                <span class="profile-data-item__title">
                    {{title}}
                </span>
                <span class="profile-data-item__value">
                    {{value}}
                </span>
            </div>
        `;
    }
}
