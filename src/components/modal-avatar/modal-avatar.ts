import Block from "../../core/Block";
import { InputWithLabel } from "..";
import { changeUserAvatar } from "../../services/userService";

interface IProps {
    closeUpPopup: () => void;
    events: {
        click: (e: Event) => void;
    };
    actionWithAvatar: (e: Event) => void;
    hiddenClass: string;
    closeModal: () => void;
}

type Ref = {
    modal: HTMLElement;
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
                const avatarForm = document.getElementById(
                    "avatarform"
                ) as HTMLFormElement;
                const input = document.getElementById(
                    "avatarinput"
                ) as HTMLInputElement;
                const file = input.files?.[0];
                if (!avatarForm || !file) return;
                const form = new FormData(avatarForm);

                changeUserAvatar(form);
                this.closeModal(e);
            },
        });
    }
    closeModal(e: Event) {
        const modal = this.refs.modal;
        if (e.target === modal) {
            this.props.closeModal();
        }
    }

    protected render(): string {
        return `
        <div class="modal {{hiddenClass}}" ref="modal">
            {{#>FormWrapper title=title size="s" id="avatarform"}}
            <input id="avatarinput" type="file" name="avatar"  accept=".JPEG, .JPG, .PNG, .GIF, .WebP" hidden>
            <label class="modal-avatar-text" for="avatarinput">Выбрать файл на компьютере</label>
            <div class="modal-button-field">
                 {{{MainButton class="contained" text=buttonText onClick=actionWithAvatar type="submit"}}}
            </div >
            {{/FormWrapper}}
        </div>
        `;
    }
}
