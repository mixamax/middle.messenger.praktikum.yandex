import Block from "../../core/Block";

interface IProps {
    events: {
        click: () => void;
    };
    onAvatarClick: () => void;
}

type Ref = {};

export class ProfilePageAvatar extends Block<IProps, Ref> {
    constructor(props: IProps) {
        super({
            ...props,
            events: {
                click: () => props.onAvatarClick(),
            },
        });
    }

    protected render(): string {
        return `
           <div class="profile-page__avatar">
               <img width="40px" src="/images/media-icon.svg" alt="иконка_медиа" />
               <span class="profile-page__avatar-text">Поменять <br /> аватар</span>
               <div class="profile-page__avatar profile-page__avatar-mask"></div>
           </div>
           <span class="profile-page__username">Иван</span>
        `;
    }
}
