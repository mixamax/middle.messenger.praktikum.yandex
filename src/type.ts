export type AppState = {
    error: string | null;
    user: User | null;
    isOpenDialogChat: boolean;
    chats: Chat[];
    activeChatId: "none" | number;
    messages: Message[];
    activeChat: Chat | null;
    activeChatTitle: string;
};
type Message = {
    id?: string;
    chat_id?: number;
    time: string;
    type: string;
    user_id: string;
    content: string;
    file?: {
        id: number;
        user_id: number;
        path: string;
        filename: string;
        content_type: string;
        content_size: number;
        upload_date: string;
    };
};

export type User = {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    login: string;
    avatar: string;
    email: string;
};

export type ChangeProfileData = {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
};

export type ChangePassData = {
    oldPassword: string;
    newPassword: string;
};

type LastMessage = {
    user: User;
    time: string;
    content: string;
};

type Nullable<T> = T | null;

export type Chat = {
    id: number;
    title: string;
    avatar: Nullable<string>;
    unread_count: number;
    last_message: LastMessage | null;
    activeClass?: string;
    created_by: number;
};
