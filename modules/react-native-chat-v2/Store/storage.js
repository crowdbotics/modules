import options from "../options";

export const upload = async (file) => {
  const res = await fetch(`${options.ENDPOINT}/store/S3?key=${options.FILESTACK_KEY}&mimetype=image/jpeg&base64decode=true`, {
    method: 'POST',
    headers: {
      'Content-Type': 'image/jpeg',
      'Access-Control-Allow-Origin': '*'
    },
    body: file
  });
  return res.json();
};

export const users = [
  {
    "name": "Mark Kelley",
    "_id": "user_a00001",
    "avatar": "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    "name": "Anna Gordon",
    "_id": "user_a00002",
    "avatar": "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    "name": "Luis Griffin",
    "_id": "user_a00003",
    "avatar": "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    "name": "Sue Flores",
    "_id": "user_a00004",
    "avatar": "https://randomuser.me/api/portraits/women/2.jpg"
  }
]