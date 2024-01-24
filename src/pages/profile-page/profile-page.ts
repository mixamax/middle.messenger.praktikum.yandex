import Block from "../../core/Block";
import { navigate } from "../../core/navigate";
import { ModalAvatar } from "../../components";

interface IProps {
    goToChangeData: () => void;
    goToChangePassword: () => void;
    exit: () => void;
    onAvatarClick: () => void;
}

type Refs = {
    modalavatar: ModalAvatar;
};

class ProfilePage extends Block<IProps, Refs> {
    constructor(props: IProps) {
        super({
            ...props,
            goToChangeData: () => {
                navigate("changeProfileDataPage");
            },
            goToChangePassword: () => {
                navigate("changePassPage");
            },
            exit: () => {
                navigate("login");
            },
            onAvatarClick: () =>
                this.refs.modalavatar.setProps({ hiddenClass: "" }),
        });
    }

    protected render(): string {
        return `
        {{#>PageWrapper}}
             {{{ModalAvatar ref="modalavatar" title="Загрузите файл" hiddenClass="modal-hidden" buttonText="Поменять"}}}
             {{#>LeftBar width="narrow"}}
                  {{{LeftBarBackButton}}}
             {{/LeftBar}}
             {{#>MainWindow}}
                 {{{ProfilePageAvatar onAvatarClick=onAvatarClick}}}
                 {{#>ProfileForm}}
                     {{{ProfileDataItem title="Почта" value="ivan@ivan.ru"}}}
                     {{{ProfileDataItem title="Логин" value="ivan"}}}
                     {{{ProfileDataItem title="Имя" value="Иван"}}}
                     {{{ProfileDataItem title="Фамилия" value="Иванов"}}}
                     {{{ProfileDataItem title="Имя в чате" value="Иван"}}}
                     {{{ProfileDataItem title="Телефон" value="222-32-22"}}}
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
export default ProfilePage;
