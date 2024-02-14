import Block from "../../core/Block";
import { InputWithLabel } from "..";

interface IProps {
    closeUpPopup: () => void;
    events: {
        click: (e: Event) => void;
    };
    actionWithUserOrChat: (e: Event) => void;
    clickOnButton: () => void;
    title: string;
    closeModal: () => void;
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
            actionWithUserOrChat: (e) => {
                e.preventDefault();
                this.props.clickOnButton();
                this.props.closeUpPopup();
                if (!this.refs.userAction.isErrorProps())
                    this.refs.modal.classList.add("modal-hidden");
            },
        });
    }
    closeModal(e: Event) {
        // const modal = document.querySelector(".modal");
        const modal = this.refs.modal;
        if (e.target === modal) {
            this.props.closeModal();
        }
    }

    public getInputValueAndIsError() {
        return {
            value: this.refs.userAction.value(),
            isError: this.refs.userAction.isErrorProps(),
        };
    }

    protected render(): string {
        return `
        <div class="modal {{hiddenClass}}" ref="modal">
            {{#>FormWrapper title=title size="s"}}
            {{{InputWithLabel id="input-modal" 
                placeholder=placeholder 
                labelTitle=labelTitle 
                type="text" 
                className="input-custom"  
                ref="userAction" 
                name=name
                errMsg=errMsg
            }}}
            <div class="modal-button-field">
                 {{{MainButton class="contained" text=buttonText onClick=actionWithUserOrChat}}}
            </div >
            {{/FormWrapper}}
        </div>
        `;
    }
}
