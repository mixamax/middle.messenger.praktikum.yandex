import Block from "../../core/Block";
import { Input } from "..";
import { connect } from "../../../utils/connect";

interface IProps {
    showClosePopup: (popUp: string) => void;
    events: {
        click: (e: Event) => void;
    };
    blur: () => void;
    inputFocus: () => void;
}

type Ref = {
    msgInput: Input;
};

class WindowFooter extends Block<IProps, Ref> {
    constructor(props: IProps) {
        super({
            ...props,
            events: {
                click: (e) => {
                    e.preventDefault();
                    const target = e.target as HTMLElement;
                    const click = target.dataset?.click;
                    const button = target.dataset?.button;

                    if (click === "window-footer-bar")
                        this.props.showClosePopup("downPopUp");
                    if (button === "footer-button") this.inputValueAction();
                },
            },
            blur: () => {},
            inputFocus: () => {},
        });
    }
    inputValueAction() {
        const inputValue = this.refs.msgInput;
        inputValue.changeValue("");
    }

    protected render(): string {
        return `
    <div class="window-footer">
        <div data-click="window-footer-bar" class="window-footer-bar {{class}}">
            <svg
                data-click="window-footer-bar"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="inherit"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    data-click="window-footer-bar"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.18662 13.5L14.7628 5.92389L15.7056 6.8667L8.12943 14.4428L7.18662 13.5Z"
                    fill="inherit"
                />
                <path
                    data-click="window-footer-bar"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.70067 16.014L17.2768 8.43781L18.2196 9.38062L10.6435 16.9568L9.70067 16.014Z"
                    fill="inherit"
                />
                <path
                    data-click="window-footer-bar"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.0433 21.3567L22.6195 13.7806L23.5623 14.7234L15.9861 22.2995L15.0433 21.3567Z"
                    fill="inherit"
                />
                <path
                    data-click="window-footer-bar"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.5574 23.8706L25.1335 16.2945L26.0763 17.2373L18.5002 24.8134L17.5574 23.8706Z"
                    fill="inherit"
                />
                <path
                    data-click="window-footer-bar"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.5574 23.8709C14.9423 26.486 10.7118 26.4954 8.10831 23.8919C5.50482 21.2884 5.51424 17.0579 8.12936 14.4428L7.18655 13.5C4.0484 16.6381 4.0371 21.7148 7.16129 24.839C10.2855 27.9632 15.3621 27.9518 18.5003 24.8137L17.5574 23.8709Z"
                    fill="inherit"
                />
                <path
                    data-click="window-footer-bar"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M22.6195 13.7806L23.5623 14.7234C26.003 12.2826 26.0118 8.3341 23.5819 5.90417C21.152 3.47424 17.2035 3.48304 14.7627 5.92381L15.7055 6.86662C17.6233 4.94887 20.7257 4.94196 22.6349 6.85119C24.5441 8.76042 24.5372 11.8628 22.6195 13.7806Z"
                    fill="inherit"
                />
                <path
                    data-click="window-footer-bar"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.70092 16.0144C7.95751 17.7578 7.95123 20.5782 9.68689 22.3138C11.4226 24.0495 14.2429 24.0432 15.9863 22.2998L15.0435 21.357C13.8231 22.5774 11.8489 22.5818 10.6339 21.3668C9.41894 20.1518 9.42334 18.1776 10.6437 16.9572L9.70092 16.0144Z"
                    fill="inherit"
                />
            </svg>
        </div>
        {{{Input className="window-footer-searchline" type="text" placeholder="Сообщение" name="message" ref="msgInput" id="msgInput" blur=blur inputFocus=inputFocus }}}
        <button class="window-footer-button" data-button="footer-button">
            <svg
                data-button="footer-button"
                width="13"
                height="12"
                viewBox="0 0 13 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect y="5.19995" width="11" height="1.6" fill="white" data-button="footer-button"/>
                <path d="M7 1L11 6L7 11" stroke="white" stroke-width="1.6" data-button="footer-button"/>
            </svg>
    
        </button>
    </div>
         `;
    }
}

export default connect((state) => ({
    activeChatId: state.activeChatId,
}))(WindowFooter);
