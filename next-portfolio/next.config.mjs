/** @type {import('next').NextConfig} */
import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: []
  }
});

const nextConfig = {
  typedRoutes: true,
  pageExtensions: ['ts','tsx','md','mdx']
};

export default withMDX(nextConfig);