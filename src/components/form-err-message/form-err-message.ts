import Block from "../../core/Block";

interface IProps {
    errorText: string;
    isError: boolean;
}

type Ref = {};

export class FormErrMessage extends Block<IProps, Ref> {
    constructor(props: IProps) {
        super({
            ...props,
        });
    }

    public isErrorProp() {
        return this.props.isError;
    }

    protected render(): string {
        const { errorText, isError } = this.props;

        return `
        <div class="form-err-message ${
            !isError ? "form-err-message-hidden" : ""
        }">
             <span>${errorText}</span>
        </div>
        `;
    }
}
