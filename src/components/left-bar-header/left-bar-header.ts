import Block from "../../core/Block";
import { Input } from "..";
import router from "../../core/router";

interface IProps {
    openModal: (e: Event) => void;
    events: {
        click: (e: Event) => void;
    };
    blur: () => void;
    inputFocus: () => void;
}

type Ref = {
    leftbarHeaderInput: Input;
};

export class LeftBarHeader extends Block<IProps, Ref> {
    constructor(props: IProps) {
        super({
            ...props,
            events: {
                click: (e) => {
                    const target = e.target as HTMLElement;
                    const profile = target.dataset?.profile;
                    if (profile === "profile") {
                        e.preventDefault();
                        router.go("/settings");
                    }
                    if (profile === "button") {
                        props.openModal(e);
                    }
                },
            },
            blur: () => {
                const inputValue = this.refs.leftbarHeaderInput.value();
                console.log(inputValue);
            },
            inputFocus: () => {},
        });
    }

    protected render(): string {
        return `
        <div class="leftbar-header__search-block">     
            <div class="leftbar-header__button-block">
                <button  class="search-block__button" data-profile="button">+ создать чат</button>
                <a class="search-block__link" href="#" > 
                    <span data-profile="profile">Профиль</span> 
                    <img src="/images/right-icon.svg" alt="стрелка_вправо" ></img>
                </a> 
            </div>
            {{{Input className="search-block__input" type="text" placeholder="Поиск" ref="leftbarHeaderInput" blur=blur inputFocus=inputFocus}}}
        </div>
         `;
    }
}
