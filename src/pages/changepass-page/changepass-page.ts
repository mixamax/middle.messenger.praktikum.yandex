import Block from "../../core/Block";
import { InputForm } from "../../components";
import { ModalAvatar } from "../../components";
import router from "../../core/router";
import { changeUserPass } from "../../services/userService";

// import { navigate } from "../../core/navigate";

interface IProps {
    saveChanges: (e: Event) => void;
    goToLogin: () => void;
    checkPassword: () => boolean;
    onAvatarClick: () => void;
    goBack: (e: Event) => void;
}

type Refs = {
    oldPassword: InputForm;
    newPassword: InputForm;
    password_repeat: InputForm;
    modalavatar: ModalAvatar;
};

class ChangePassPage extends Block<IProps, Refs> {
    constructor(props: IProps) {
        super({
            ...props,
            saveChanges: (event) => {
                event.preventDefault();
                const oldPassword = this.refs.oldPassword;
                const newPassword = this.refs.newPassword;
                const password_repeat = this.refs.password_repeat;

                if (
                    oldPassword.isErrorProps() ||
                    oldPassword.value().trim() == "" ||
                    newPassword.isErrorProps() ||
                    oldPassword.value().trim() == "" ||
                    password_repeat.isErrorProps() ||
                    oldPassword.value().trim() == ""
                ) {
                    console.log("неправильные значения");
                    return;
                } else {
                    console.log("oldPassword:", oldPassword.value());
                    console.log("newPassword:", newPassword.value());
                    console.log("password_repeat:", password_repeat.value());
                    changeUserPass({
                        oldPassword: oldPassword.value(),
                        newPassword: newPassword.value(),
                    });
                }
            },
            checkPassword: () => {
                const newPassword = this.refs.newPassword.value();
                const password_repeat = this.refs.password_repeat.value();

                if (newPassword === password_repeat) {
                    return true;
                } else {
                    return false;
                }
            },
            goBack: (e) => {
                e.preventDefault();
                router.go("/settings");
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
                  {{{LeftBarBackButton onClick=goBack}}}
             {{/LeftBar}}
             {{#>MainWindow}}
                 {{{ProfilePageAvatar onAvatarClick=onAvatarClick}}}
                     {{#>ProfileForm}}
                        {{{InputForm 
                            id="old" 
                            title="Старый пароль" 
                            type="password" 
                            value="wowoeiwow" 
                            name="oldPassword"  
                            errMsg = "Неверный пароль" 
                            ref="oldPassword" 
                            placeholder="старый&nbspпароль"
                        }}}
                        {{{InputForm 
                            id="new" 
                            title="Новый пароль" 
                            type="password" 
                            value="wowoeiwow" 
                            name="newPassword"  
                            errMsg = "Неверный пароль" 
                            ref="newPassword" 
                            placeholder="новый&nbspпароль" 
                        }}}
                        {{{InputForm 
                            id="repeatnew" 
                            title="Повторите новый пароль" 
                            type="password" value="wowoeiwow" 
                            name="password_repeat"  
                            errMsg = "Неверный пароль" 
                            ref="password_repeat" 
                            checkPassword=checkPassword 
                            placeholder="новый&nbspпароль" 
                        }}}
                     {{/ProfileForm}}
                 {{{MainButton class="contained " text="Сохранить" mt="152px" onClick=saveChanges}}}
            {{/MainWindow}}
        {{/PageWrapper}}
        `;
    }
}
export default ChangePassPage;
