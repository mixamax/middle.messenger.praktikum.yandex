import Block from "../../core/Block";
import { FormErrMessage, Input } from "..";
import { validate } from "../../../utils/validate";

interface IProps {
    id: string;
    title: string;
    isError: boolean;
    name: string;
    type: string;
    value: string;
    inputValidate: () => void;
    blur: () => void;
    inputFocus: () => void;
    checkPassword: () => boolean;
}

type Ref = {
    input: Input;
    formErrMessage: FormErrMessage;
};

export class InputForm extends Block<IProps, Ref> {
    constructor(props: IProps) {
        super({
            ...props,
            blur: () => this.inputValidate(),
            inputFocus: () => this.inputFocus(),
        });
    }
    inputFocus() {
        this.refs.formErrMessage.setProps({ isError: false });
    }
    inputValidate() {
        const { name } = this.props;
        if (name === "password_repeat") {
            if (!this.props.checkPassword()) {
                this.refs.formErrMessage.setProps({ isError: true });
            }
        } else if (!validate(name, this.refs.input.value())) {
            this.refs.formErrMessage.setProps({ isError: true });
        }
    }

    public value() {
        return this.refs.input.value();
    }
    public isErrorProps() {
        return this.refs.formErrMessage.isErrorProp();
    }

    protected render(): string {
        const { id, title, isError } = this.props;

        return `
        <div>
        <div class="inputform-wrapper">
            <label for=${id} class="inputform-label">
                 ${title}
            </label>            
            {{{Input
                id=id
                type=type
                name=name
                value=value
                ref="input"
                className="inputform"
                blur=blur 
                inputFocus=inputFocus
                placeholder=placeholder
            }}}
        </div>
        {{{FormErrMessage errorText=errMsg isError=${isError} ref="formErrMessage"}}}
        </div>
        `;
    }
}
