import Block from "../../core/Block";
import { FormErrMessage, Input } from "..";
import { validate } from "../../../utils/validate";

interface IProps {
    id: string;
    labelTitle: string;
    isError: boolean;
    name: string;
    inputValidate: () => void;
    blur: () => void;
    inputFocus: () => void;
    checkPassword: () => boolean;
}

type Ref = {
    input: Input;
    formErrMessage: FormErrMessage;
};

export class InputWithLabel extends Block<IProps, Ref> {
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
        const { id, labelTitle, isError } = this.props;
        return `
        <div ref="inputWithLabel">
            <div class="input-wrapper">
                 {{{Input id=id  
                    placeholder=placeholder 
                    type=type name=name 
                    input-error=inputError 
                    ref="input" 
                    blur=blur 
                    inputFocus=inputFocus
                    className="input-custom"
                }}}
                 <label for=${id} class="input-label">
                      ${labelTitle}
                 </label>
             </div>
             {{{FormErrMessage errorText=errMsg isError=${isError} ref="formErrMessage"}}}
        </div>
        `;
    }
}
