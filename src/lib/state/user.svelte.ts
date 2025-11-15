import { getContext, setContext } from "svelte";
import type { User } from "better-auth";
import type { ExtendedUser } from "../../app";

const USER_CTX = Symbol('user');
export function setUserState(user: ExtendedUser | null) {
    const userState = $state<ExtendedUser | null>(user);
    setContext(USER_CTX, userState);
    return userState as ExtendedUser | null;
}

export function getUserState() {
    return getContext<ExtendedUser | null>(USER_CTX) as ExtendedUser | null;
}