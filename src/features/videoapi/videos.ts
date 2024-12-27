import { api } from "lib/api-client";
import Cookies from 'js-cookie';

const authToken = Cookies.get('accessToken') || "";
export const getAllVideos = async (page: number, limit: number) => {
    const response = await api.get('/videos', {
        params: {
            page,
            limit,
        },
        headers: {
            "Authorization": authToken,
        },
    });
    return response;
};

export const getChannelVideos = async () => {
    const response = await api.get(`/dashboard/videos`, {
        headers: {
            "Authorization": authToken,
        }
    });
    return response
}