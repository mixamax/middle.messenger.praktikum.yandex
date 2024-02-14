import Block from "../../core/Block";

interface IProps {
    inputError: string;
    placeholder: string;
    type: string;
    name: string;
    className: string;
    value: string;
    id: string;
    blur: () => void;
    inputFocus: () => void;
    events: {
        blur: () => void;
        focus: () => void;
    };
}

type Ref = {
    input: HTMLInputElement;
};

export class Input extends Block<IProps, Ref> {
    constructor(props: IProps) {
        super({
            ...props,
            events: {
                blur: () => props.blur(),
                focus: () => props.inputFocus(),
            },
        });
    }

    public value() {
        return this.refs.input.value;
    }
    public changeValue(v: string) {
        this.refs.input.value = v;
    }

    protected render(): string {
        const { inputError, placeholder, type, name, id, value, className } =
            this.props;

        return `
            <input
                 id=${id}
                 class="${className} ${inputError}"
                 placeholder=${placeholder}
                 type=${type}
                 name=${name}
                 ref="input"
                 value="${value || ""}"

            />
        `;
    }
}
