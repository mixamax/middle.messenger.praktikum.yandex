import Block from "../../core/Block";
import { InputWithLabel } from "../../components";
import { signin } from "../../services/authService";
import router from "../../core/router";

interface IProps {
    inputValidateLogin: () => void;
    inputValidatePass: () => void;
    onLogin: (e: Event) => void;
    onRegistration: (e: Event) => void;
    inputFocus: (type: typeName) => void;
}
enum typeName {
    name = "name",
    login = "login",
    email = "email",
    password = "password",
    phone = "phone",
}
type Refs = {
    login: InputWithLabel;
    password: InputWithLabel;
};

class LogIn extends Block<IProps, Refs> {
    constructor(props: IProps) {
        super({
            ...props,
            onLogin: (event) => {
                event.preventDefault();
                const login = this.refs.login.value();
                const password = this.refs.password.value();

                if (
                    this.refs.login.isErrorProps() ||
                    login.trim() == "" ||
                    this.refs.password.isErrorProps() ||
                    login.trim() == ""
                ) {
                    console.log("неверные значения");
                    return;
                }
                signin({
                    login: login,
                    password: password,
                });
            },
            onRegistration: (event) => {
                event.preventDefault();
                router.go("/sign-up");
            },
        });
    }

    protected render(): string {
        return `
        {{#>PageWrapper }}
            {{#>FormWrapper size="m" title="Вход"}}
                {{{InputWithLabel 
                    id="inputLogin" 
                    placeholder="Логин" 
                    errMsg = "Неверный логин" 
                    isError ="false" 
                    labelTitle="Логин" 
                    type="text" 
                    name="login" 
                    ref="login"  
                }}}               
                {{{InputWithLabel 
                    id="inputPassword" 
                    placeholder="Пароль"
                    errMsg = "Неверный пароль" 
                    isError ="false" 
                    labelTitle="Пароль" 
                    type="password" 
                    name="password" 
                    ref="password" 
                }}}
                {{#>ButtonsField}}
                {{{MainButton class="contained" text="Авторизоваться" onClick=onLogin ref="loginButton"}}}
                {{{MainButton class="onlytext" text="Нет аккаунта?" onClick=onRegistration ref="registrationButton"}}}
                {{/ButtonsField}}
            {{/FormWrapper}}
        {{/PageWrapper}}
        `;
    }
}
export default LogIn;
