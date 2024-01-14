import Block from "../../core/Block";
import { InputWithLabel } from "..";
// import { RefType } from "../../core/Block";
// import { BlockClass } from "../../core/Block";
interface IProps {
    closeUpPopup: () => void;
    events: {
        click: (e: Event) => void;
    };
    actionWithAvatar: (e: Event) => void;
    hiddenClass: string;
}

type Ref = {
    modalavatar: HTMLElement;
    userAction: InputWithLabel;
};

export class ModalAvatar extends Block<IProps, Ref> {
    constructor(props: IProps) {
        super({
            ...props,
            events: {
                click: (e) => this.closeModal(e),
            },
            actionWithAvatar: (e) => {
                e.preventDefault();
                console.log("Поменять");
                this.refs.modalavatar.classList.add("modal-hidden");
            },
        });
    }
    closeModal(e: Event) {
        const modal = document.querySelector(".modal");
        if (e.target === modal) {
            this.refs.modalavatar.classList.add("modal-hidden");
        }
    }

    protected render(): string {
        return `
        <div class="modal {{hiddenClass}}" ref="modalavatar">
            {{#>FormWrapper title=title size="s"}}
            <div class="modal-avatar-text">Выбрать файл на компьютере</div>
            <div class="modal-button-field">
                 {{{MainButton class="contained" text=buttonText onClick=actionWithAvatar}}}
            </div >
            {{/FormWrapper}}
        </div>
        `;
    }
}
