/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "tm.ibxk.com.br",
                port: "",
            },
            {
                protocol: "https",
                hostname: "i.ibb.co",
                port: "",
            },
        ],
    },
};

module.exports = nextConfig;
