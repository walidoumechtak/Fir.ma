module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost:8080",
        port: "",
        pathname: "/api/media/static/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
