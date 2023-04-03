module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (dev && !isServer) {
      config.plugins.push(new webpack.HotModuleReplacementPlugin());
    }
    return config;
  },
};
