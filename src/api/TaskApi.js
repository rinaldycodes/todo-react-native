import { MyConstants } from "../constants/MyConstants";

const getTasks = async ({
    token,
    params
}) => {
   
    try {
        const response = await fetch(MyConstants.APP_API_URL + '/tasks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        });

        const res = await response.json();

        console.log('response json', res);

        return res;

    } catch (error) {
        console.error('error:', error);
        return {
            code: 'catch',
            message: error || 'Terjadi kesalahan (client)',
            data: {},
        }
    }
}

const getTaskById = async ({
    token,
    params
}) => {
   
    try {
        const response = await fetch(MyConstants.APP_API_URL + '/tasks/'+params.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        });

        const res = await response.json();

        console.log('response json', res);

        return res;

    } catch (error) {
        console.error('error:', error);
        return {
            code: 'catch',
            message: error || 'Terjadi kesalahan (client)',
            data: {},
        }
    }
}

export const TaskApi = {
    getTasks,
    getTaskById
}