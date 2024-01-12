import Block from "../../core/Block";
import { InputWithLabel } from "..";

interface IProps {
    closeUpPopup: () => void;
    events: {
        click: (e: Event) => void;
    };
    actionWithUser: (e: Event) => void;
}

type Ref = {
    modal: HTMLElement;
    userAction: InputWithLabel;
};

export class Modal extends Block<IProps, Ref> {
    constructor(props: IProps) {
        super({
            ...props,
            events: {
                click: (e) => this.closeModal(e),
            },
            actionWithUser: (e) => {
                e.preventDefault();
                const userLogin = this.refs.userAction.value();
                console.log("Логин:", userLogin);
                this.props.closeUpPopup();
                this.refs.modal.classList.add("modal-hidden");
            },
        });
    }
    closeModal(e: Event) {
        const modal = document.querySelector(".modal");
        if (e.target === modal) {
            this.refs.modal.classList.add("modal-hidden");
            this.props.closeUpPopup();
        }
    }

    protected render(): string {
        return `
        <div class="modal {{hiddenClass}}" ref="modal">
            {{#>FormWrapper title=title size="s"}}
            {{{InputWithLabel id="input-modal" placeholder="Логин" labelTitle="Логин" type="text" className="input-custom"  ref="userAction" }}}
            <div class="modal-button-field">
                 {{{MainButton class="contained" text=buttonText onClick=actionWithUser}}}
            </div >
            {{/FormWrapper}}
        </div>
        `;
    }
}
