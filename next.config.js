/** @type {import('next').NextConfig} */
const {withPlugins} = require("next-compose-plugins")
const {i18n} = require("./next-i18next.config")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: false
})

const domains = process.env.NODE_ENV === "production" ? [] : ["localhost"]

module.exports = withPlugins([[withBundleAnalyzer]], {
    compress: true,
    reactStrictMode: true,
    i18n,
    images: {
        domains
    }
})
