import Block from "../../core/Block";
import { InputWithLabel } from "../../components";
// import { navigate } from "../../core/navigate";
import { signup } from "../../services/authService";

interface IProps {
    onRegistration: (e: Event) => void;
    goToLogin: () => void;
    checkPassword: () => boolean;
}

type Refs = {
    login: InputWithLabel;
    password: InputWithLabel;
    password_repeat: InputWithLabel;
    email: InputWithLabel;
    phone: InputWithLabel;
    first_name: InputWithLabel;
    second_name: InputWithLabel;
};

class AuthPage extends Block<IProps, Refs> {
    constructor(props: IProps) {
        super({
            ...props,
            onRegistration: (event) => {
                event.preventDefault();
                const login = this.refs.login;
                const password = this.refs.password;
                const password_repeat = this.refs.password_repeat;
                const email = this.refs.email;
                const phone = this.refs.phone;
                const first_name = this.refs.first_name;
                const second_name = this.refs.second_name;
                if (
                    login.isErrorProps() ||
                    login.value().trim() == "" ||
                    password.isErrorProps() ||
                    password.value().trim() == "" ||
                    password_repeat.isErrorProps() ||
                    password_repeat.value().trim() == "" ||
                    email.isErrorProps() ||
                    email.value().trim() == "" ||
                    phone.isErrorProps() ||
                    phone.value().trim() == "" ||
                    first_name.isErrorProps() ||
                    first_name.value().trim() == "" ||
                    second_name.isErrorProps() ||
                    second_name.value().trim() == ""
                ) {
                    console.log("неправильные значения");
                    return;
                } else {
                    const body = {
                        first_name: first_name.value(),
                        second_name: second_name.value(),
                        login: login.value(),
                        email: email.value(),
                        password: password.value(),
                        phone: phone.value(),
                    };

                    signup(body);
                }
            },
            checkPassword: () => {
                const password = this.refs.password.value();
                const password_repeat = this.refs.password_repeat.value();

                if (password === password_repeat) {
                    return true;
                } else {
                    console.log(false);
                    return false;
                }
            },
            goToLogin: () => {
                navigate("login");
            },
        });
    }

    protected render(): string {
        return `
        {{#>PageWrapper}}
            {{#>FormWrapper size="l" title="Aвторизация"}}
            {{{InputWithLabel id="input-auth-email" placeholder="Почта" labelTitle="Почта" type="email" name="email"  ref="email" errMsg = "Неверное значение" }}}
            {{{InputWithLabel id="input-auth-login" placeholder="Логин" labelTitle="Логин" type="text" name="login" ref="login" errMsg = "Неверное значение"}}}
            {{{InputWithLabel id="input-auth-name" placeholder="Имя" labelTitle="Имя" type="text" name="first_name" ref="first_name" errMsg = "Неверное значение"}}}
            {{{InputWithLabel id="input-auth-lastname" placeholder="Фамилия" labelTitle="Фамилия" type="text" name="second_name" ref="second_name" errMsg = "Неверное значение"}}}
            {{{InputWithLabel id="input-auth-tel" placeholder="Телефон" labelTitle="Телефон" type="tel" name="phone" ref="phone" errMsg = "Неверное значение"}}}
            {{{InputWithLabel id="input-auth-password" placeholder="Пароль" labelTitle="Пароль" type="password" input-error="input-error" name="password" ref="password" errMsg = "Неверное значение"}}}
            {{{InputWithLabel id="input-auth-passwordrepeat" placeholder="Пароль (еще раз)" labelTitle="Пароль (еще раз)" type="password" input-error="input-error" name="password_repeat" ref="password_repeat" errMsg = "Пароли не совпадают"  checkPassword=checkPassword}}}
            {{#>ButtonsField}}
                {{{MainButton class="contained" text="Зарегистрироваться" onClick=onRegistration}}}
                {{{MainButton class="onlytext" text="Войти" onClick=goToLogin}}}
            {{/ButtonsField}}
            {{/FormWrapper}}
        {{/PageWrapper}}
        `;
    }
}
export default AuthPage;
