export default () => ({
  aws: {
    region: process.env.AWS_REGION,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    queue_name: process.env.AWS_QUEUE_NAME,
    url: process.env.AWS_QUEUE_URL,
  },
});
