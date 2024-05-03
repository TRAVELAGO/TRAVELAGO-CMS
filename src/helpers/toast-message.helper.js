import { KeyMessageApi, TypeMessageApi } from "../utils/const/toast";

export default class MessageAPIHelper {
    constructor() {}

    static success(content, duration) {
        return {
            key: KeyMessageApi.SUCCESS,
            type: TypeMessageApi.SUCCESS,
            content: content,
            duration: duration ?? 2,
        }
    }

    static error(content, duration) {
        return {
            key: KeyMessageApi.ERROR,
            type: TypeMessageApi.ERROR,
            content: content,
            duration: duration ?? 2,
        }
    }
    static warning(content, duration) {
        return {
            key: KeyMessageApi.WARNING,
            type: TypeMessageApi.WARNING,
            content: content,
            duration: duration ?? 2,
        }
    }
    static loading(content, duration) {
        return {
            key: KeyMessageApi.LOADING,
            type: TypeMessageApi.LOADING,
            content: content,
            duration: duration ?? 2,
        }
    }
    static info(content, duration) {
        return {
            key: KeyMessageApi.INFO,
            type: TypeMessageApi.INFO,
            content: content,
            duration: duration ?? 2,
        }
    }
}