export declare enum TypeError {
    NOT_NULL = "23502",
    UNIQUE = "23505",
    NOT_INTEGER = "22P02"
}
export declare class UserMessageValidators {
    messages: {
        type: TypeError;
        property: string;
        message: string;
    }[];
    getMessage(property: string, type: TypeError): string;
}
