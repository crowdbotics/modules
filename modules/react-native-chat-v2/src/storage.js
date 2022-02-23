import { FILESTACK_KEY } from "@env"
const KEY = FILESTACK_KEY;
const ENDPOINT = 'https://www.filestackapi.com/api';
export const upload = async (file) => {
    const res = await fetch(`${ENDPOINT}/store/S3?key=${KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'image/png',
            'Access-Control-Allow-Origin': '*'
        },
        body: file
    });
    return res.json();
};
