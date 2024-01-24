export interface IpopUpData {
    upPopUp: { path: string; text: string; alt: string; data: string }[];
    downPopUp: { path: string; text: string; alt: string; data: string }[];
}

export const popUpData: IpopUpData = {
    upPopUp: [
        {
            path: "/images/add-icon.svg",
            text: "Добавить пользователя",
            alt: "плюс",
            data: "addUser",
        },
        {
            path: "/images/delete-icon.svg",
            text: "Удалить пользователя",
            alt: "крест",
            data: "deleteUser",
        },
    ],
    downPopUp: [
        {
            path: "/images/media-icon-blue.svg",
            text: "Фото или Видео",
            alt: "иконка_медиа",
            data: "none",
        },
        {
            path: "/images/file-icon.svg",
            text: "Файл",
            alt: "иконка_файла",
            data: "none",
        },
        {
            path: "/images/location-icon.svg",
            text: "Локация",
            alt: "иконка_локации",
            data: "none",
        },
    ],
};
