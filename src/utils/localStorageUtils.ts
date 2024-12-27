// utils/localStorageUtils.ts

export const setItem = (key: string, value: unknown): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const getItem = <T>(key: string): T | null => {
    console.log("value----",key,typeof window)
    if (typeof window !== 'undefined') {
        const value = localStorage.getItem(key);
        console.log("value",value)
        return value ? JSON.parse(value) : null;
    }
    return null;
};

export const removeItem = (key: string): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
    }
};

export const clearStorage = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.clear();
    }
};
