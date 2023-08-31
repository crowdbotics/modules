import options from "../options";

export const upload = async (file) => {
  const res = await fetch(`${options.ENDPOINT}/store/S3?key=${options.FILESTACK_KEY}&mimetype=image/jpeg&base64decode=true`, {
    method: "POST",
    headers: {
      "Content-Type": "image/jpeg",
      "Access-Control-Allow-Origin": "*"
    },
    body: file
  });
  return res.json();
};
