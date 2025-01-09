export type entry = {
    id: number;
    user_id: number;
    scale_id: number;
    date: string;
    message: string;
}

export type scale = {
    id: number;
    name: string;
    value: number;
    icon: string;
}

export type user = {
    id: number;
    name: string;
    email: string;
    password: string;
}
