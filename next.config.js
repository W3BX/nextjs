/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGO: 'mongodb+srv://user1:erjjYzxXY3hHO7JF@cluster0.g728sqv.mongodb.net/nextjs?retryWrites=true&w=majority',
    HOST: `http://127.0.0.1:3000`,
  },
}


module.exports = nextConfig
