import options from "../options";

export const upload = async (file) => {
  const res = await fetch(`${options.ENDPOINT}/store/S3?key=${options.FILESTACK_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'image/png',
      'Access-Control-Allow-Origin': '*'
    },
    body: file
  });
  return res.json();
};

export const users = [
  {
    "name": "Mark Kelley",
    "_id": "user_63ea15931d8541a3bd35e5b1f09087dc",
    "avatar": "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    "name": "Anna Gordon",
    "_id": "user_3c4400761cba4b65b77b6cae55fc21eb",
    "avatar": "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    "name": "Luis Griffin",
    "_id": "user_def709b1adfc4e67b98bb7a820f581b1",
    "avatar": "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    "name": "Sue Flores",
    "_id": "user_a56c20222c484ff8987ec9b69b0c8f5b",
    "avatar": "https://randomuser.me/api/portraits/women/2.jpg"
  }
]