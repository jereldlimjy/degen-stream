/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["@resvg/resvg-js"],
    },
    webpack: (config) => {
        config.externals.push({
            sharp: "commonjs sharp",
            "@resvg/resvg-js": "commonjs @resvg/resvg-js",
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
