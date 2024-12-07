const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: '/:path*',
          destination: '/404',
        },
      ],
    }
  },
});