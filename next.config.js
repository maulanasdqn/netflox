/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: "dist",
  env: {
    bearerToken:
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNWNhMmFhNmNlZTA1Mjg4ZmFlYjVjMTVmOTNjNTY5YiIsInN1YiI6IjYyYmQyZWQzNzMwNGI1MjM4NTZjMjFmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EG2BTuWWaPgKhIlPMXvMUE035uYAc20NkxWF5uFLEdc",
  },
};

module.exports = nextConfig;
