import Block from "../../core/Block";
import { appStore } from "../../store/appStore";
import constants from "../../constants";
import { connect } from "../../../utils/connect";

interface IProps {
    events: {
        click: () => void;
    };
    onAvatarClick: () => void;
}

type Ref = {};

class ProfilePageAvatar extends Block<IProps, Ref> {
    constructor(props: IProps) {
        super({
            ...props,
            events: {
                click: () => props.onAvatarClick(),
            },
        });
    }

    protected render(): string {
        let avatarPath;
        let width;
        if (appStore.getState().user?.avatar) {
            avatarPath = `${constants.HOST}/resources${
                appStore.getState().user?.avatar
            }`;
            width = "100px";
        } else {
            avatarPath = "/images/media-icon.svg";
            width = "30px";
        }

        return `
           <div class="profile-page__avatar">
               <img width=${width} src=${avatarPath} alt="иконка_аватара" />
               <span class="profile-page__avatar-text">Поменять <br /> аватар</span>
               <div class="profile-page__avatar profile-page__avatar-mask"></div>
               <span class="profile-page__username">${
                   appStore.getState().user?.first_name
               }</span>
           </div>
           
        `;
    }
}
export default connect((state) => ({ user: state.user }))(ProfilePageAvatar);
