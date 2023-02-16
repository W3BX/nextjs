/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    MONGO: 'mongodb+srv://user1:erjjYzxXY3hHO7JF@cluster0.g728sqv.mongodb.net/nextjs?retryWrites=true&w=majority',
    HOST: `https://chatbat.vercel.app/api`,
    PSH_APP_ID:'1555121',
    PSH_KEY:'455ee9f4bb40a06a4ccc',
    PSH_SECRET:'bb51c07482e395979674',
    PSH_CLUSTER:'ap2'
  },
}


module.exports = nextConfig
