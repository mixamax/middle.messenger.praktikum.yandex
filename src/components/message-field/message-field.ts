import Block from "../../core/Block";
import { appStore } from "../../store/appStore";
import { connect } from "../../../utils/connect";

interface IProps {
    chatId: number;
    userId: number;
}

type Ref = {
    // input: Input;
};

class MessageField extends Block<IProps, Ref> {
    constructor(props: IProps) {
        super({
            ...props,
        });
    }

    protected render(): string {
        // console.log("***************RENDER MessageField***************");
        const messages = appStore.getState().messages;
        const user = appStore.getState().user;
        if (!user) return "";
        return `
    <div class="message-field">
        ${messages
            .map((message) => {
                return `<div class='message-block message-text-wrapper ${
                    Number(message.user_id) === user.id
                        ? "message-ownertext-wrapper"
                        : ""
                }'><p class='message-text'>${
                    message.type === "message" ? message.content : "file"
                }</p><div class="message-delivery-info"><div class="message__time">${getTime(
                    message.time
                )}</div></div></div>`;
            })
            .join(" ")}
    </div>
    
         `;
    }
}

export default connect((state) => ({
    messages: state.messages,
}))(MessageField);

function getTime(str: string | undefined) {
    if (str === undefined) return undefined;
    const date = new Date(Date.parse(str));
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
}

// <span class="message-date">19 июня</span>
// <div class="message-block message-text-wrapper">
//     <p class="message-text">Привет! Смотри, тут всплыл интересный кусок
//         лунной космической истории — НАСА в какой-то момент попросила
//         Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы
//         все знаем что астронавты летали с моделью 500 EL — и к слову говоря,
//         все тушки этих камер все еще находятся на поверхности Луны, так как
//         астронавты с собой забрали только кассеты с пленкой.</p>
// </div>
// <div class="message-block message-image-wrapper">
//     <img
//         class="message-image"
//         src="/images/mess-foto.png"
//         alt="фото_сообщения"
//     />
//     <div class="message__time message__time__forimage">11:56</div>
// </div>
// <div class="message-block message-text-wrapper message-ownertext-wrapper">
//     <p class="message-text">Круто!</p>
//     <div class="message-delivery-info">
//         <svg
//             class="message-delivery-icon"
//             xmlns="http://www.w3.org/2000/svg"
//             width="10"
//             height="5"
//             viewBox="0 0 10 5"
//             fill="none"
//         >
//             <line
//                 y1="-0.5"
//                 x2="3.765"
//                 y2="-0.5"
//                 transform="matrix(0.705933 0.708278 -0.705933 0.708278 0.700195 2.33313)"
//                 stroke="#3369F3"
//             />
//             <line
//                 y1="-0.5"
//                 x2="5.6475"
//                 y2="-0.5"
//                 transform="matrix(0.705933 -0.708278 0.705933 0.708278 3.35828 5.00006)"
//                 stroke="#3369F3"
//             />
//             <line
//                 y1="-0.5"
//                 x2="5.6475"
//                 y2="-0.5"
//                 transform="matrix(0.705933 -0.708278 0.705933 0.708278 6.01587 5.00006)"
//                 stroke="#3369F3"
//             />
//         </svg>
//         <div class="message__time">12:42</div>
//     </div>
// </div>
