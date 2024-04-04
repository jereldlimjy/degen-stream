/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { dev, isServer, webpack, nextRuntime }) => {
        config.module.rules.push({
            test: /\.node$/,
            use: [
                {
                    loader: "nextjs-node-loader",
                },
            ],
        });
        return config;
    },
    // prevent double render on dev mode, which causes 2 frames to exist
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                hostname: "*",
                protocol: "http",
            },
            {
                hostname: "*",
                protocol: "https",
            },
        ],
    },
};

export default nextConfig;
