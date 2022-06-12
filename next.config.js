const {withPlugins} = require("next-compose-plugins")
const {i18n} = require("./next-i18next.config")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: false
})

const domains = process.env.NODE_ENV === "production" ? ["localhost"] : ["localhost"]

/** @type {import('next').NextConfig} */
const config = {
    compress: true,
    reactStrictMode: true,
    productionBrowserSourceMaps: true,
    images: {
        domains
    },
    i18n: i18n
}

module.exports = withPlugins([[withBundleAnalyzer]], config)
