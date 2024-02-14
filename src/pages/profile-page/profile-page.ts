import Block from "../../core/Block";
import { ModalAvatar } from "../../components";
import { logout } from "../../services/authService";
import { connect } from "../../../utils/connect";
import { appStore } from "../../store/appStore";
import router from "../../core/router";

interface IProps {
    goToChangeData: (e: Event) => void;
    goToChangePassword: (e: Event) => void;
    exit: () => void;
    onAvatarClick: () => void;
    goBack: (e: Event) => void;
    closeModal: () => void;
}

type Refs = {
    modalavatar: ModalAvatar;
};

class ProfilePage extends Block<IProps, Refs> {
    constructor(props: IProps) {
        super({
            ...props,
            goToChangeData: (e) => {
                e.preventDefault();
                router.go("/settings/changeprofile");
            },
            goToChangePassword: (e) => {
                e.preventDefault();
                router.go("/settings/changepass");
            },
            exit: () => {
                logout();
            },
            goBack: (e) => {
                e.preventDefault();
                router.go("/messanger");
            },
            onAvatarClick: () => {
                this.refs.modalavatar.setProps({ hiddenClass: "" });
            },
            closeModal: () => {
                this.refs.modalavatar.setProps({ hiddenClass: "modal-hidden" });
            },
        });
    }

    protected render(): string {
        const user = appStore.getState().user;
        return `
        {{#>PageWrapper}}
             {{{ModalAvatar ref="modalavatar" title="Загрузите файл" hiddenClass="modal-hidden" buttonText="Поменять" closeModal=closeModal }}}
             {{#>LeftBar width="narrow"}}
                  {{{LeftBarBackButton onClick=goBack}}}
             {{/LeftBar}}
             {{#>MainWindow}}
                 {{{ProfilePageAvatar onAvatarClick=onAvatarClick}}}
                 {{#>ProfileForm}}
                     {{{ProfileDataItem title="Почта" value="${
                         user?.email || ""
                     }"}}}
                     {{{ProfileDataItem title="Логин" value="${
                         user?.login || ""
                     }"}}}
                     {{{ProfileDataItem title="Имя" value="${
                         user?.first_name || ""
                     }"}}}
                     {{{ProfileDataItem title="Фамилия" value="${
                         user?.second_name || ""
                     }"}}}
                     {{{ProfileDataItem title="Имя в чате" value="${
                         user?.display_name || ""
                     }"}}}
                     {{{ProfileDataItem title="Телефон" value="${
                         user?.phone || ""
                     }"}}}
                 {{/ProfileForm}}
                 {{#>ProfileForm mt="40px"}}
                      {{{ChangeDataItem color="blue" text="Изменить данные" onClick=goToChangeData}}}
                      {{{ChangeDataItem color="blue" text="Изменить пароль" onClick=goToChangePassword}}}
                      {{{ChangeDataItem color="red" text="Выйти" onClick=exit}}}
                 {{/ProfileForm}}
            {{/MainWindow}}
        {{/PageWrapper}}
        `;
    }
}

export default connect((state) => ({ user: state.user }))(ProfilePage);
