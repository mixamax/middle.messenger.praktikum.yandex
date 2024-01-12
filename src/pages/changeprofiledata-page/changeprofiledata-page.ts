import Block from "../../core/Block";
import { InputForm } from "../../components";
import { ModalAvatar } from "../../components";
import { navigate } from "../../core/navigate";

interface IProps {
    saveChanges: (e: Event) => void;
    onAvatarClick: () => void;
    // goToLogin: () => void;
}

type Refs = {
    login: InputForm;
    email: InputForm;
    phone: InputForm;
    first_name: InputForm;
    second_name: InputForm;
    display_name: InputForm;
    modalavatar: ModalAvatar;
};

class ChangeProfileDataPage extends Block<IProps, Refs> {
    constructor(props: IProps) {
        super({
            ...props,
            saveChanges: (event) => {
                event.preventDefault();
                const login = this.refs.login;
                const email = this.refs.email;
                const phone = this.refs.phone;
                const first_name = this.refs.first_name;
                const second_name = this.refs.second_name;
                const display_name = this.refs.display_name;
                if (
                    login.isErrorProps() ||
                    login.value() ||
                    email.isErrorProps() ||
                    email.value() ||
                    phone.isErrorProps() ||
                    phone.value() ||
                    first_name.isErrorProps() ||
                    first_name.value() ||
                    second_name.isErrorProps() ||
                    second_name.value()
                ) {
                    console.log("неправильные значения");
                    return;
                } else {
                    console.log("login:", login.value());
                    console.log("email:", email.value());
                    console.log("phone:", phone.value());
                    console.log("first_name:", first_name.value());
                    console.log("second_name:", second_name.value());
                    console.log("display_name:", display_name.value());
                }
            },
            onAvatarClick: () =>
                this.refs.modalavatar.setProps({ hiddenClass: "" }),

            // goToLogin: () => {
            //     navigate("login");
            // },
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
                        {{{InputForm 
                            id="inputform-mail" 
                            title="Почта" 
                            type="text" 
                            value="ivan@ivan.ru" 
                            name="email" 
                            errMsg = "Неверное значение" 
                            ref="email" placeholder="почта"
                        }}}
                        {{{InputForm 
                            id="inputform-login" 
                            title="Логин" type="text" 
                            value="ivan" 
                            name="login" 
                            errMsg = "Неверное значение" 
                            ref="login" placeholde="логин"
                        }}}
                        {{{InputForm 
                            id="inputform-name" 
                            title="Имя" 
                            type="text" 
                            value="Иван" 
                            name="first_name" 
                            errMsg = "Неверное значение" 
                            ref="first_name" 
                            placeholder="имя"
                        }}}
                        {{{InputForm 
                            id="inputform-lastname" 
                            title="Фамилия" type="text" 
                            value="Иванов" 
                            name="second_name" 
                            errMsg = "Неверное значение" 
                            ref="second_name" 
                            placeholder="фамилия"
                        }}}
                        {{{InputForm 
                            id="inputform-nick" 
                            title="Имя в чате" 
                            type="text" 
                            value="Иван" 
                            name="display_name" 
                            errMsg = "Неверное значение" 
                            ref="display_name" 
                            placeholder="имя в чате"
                        }}}
                        {{{InputForm 
                            id="inputform-tel" 
                            title="Телефон" 
                            type="text" 
                            value="222-32-22" 
                            name="phone" 
                            errMsg = "Неверное значение" 
                            ref="phone" 
                            placeholder="телефон"
                        }}}
                  {{/ProfileForm}}
                  {{{MainButton class="contained " text="Сохранить" mt="50px" onClick=saveChanges}}}
             {{/MainWindow}}
        {{/PageWrapper}}
        `;
    }
}
export default ChangeProfileDataPage;
