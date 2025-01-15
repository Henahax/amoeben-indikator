export type entry = {
    user_id: number;
    scale_id: number;
    date: string;
    description: string;
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
    password: string;
}
