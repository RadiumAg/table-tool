import { Ref } from 'vue';
export declare type UserList = {
    age: number;
    job: string;
    name: string;
    email: string;
    address: string;
    favorite: string;
}[];
export declare const useData: (length: number, dataRef: Ref<any[]>, loading?: Ref<boolean>) => Promise<void>;
