const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// 1. Tambahkan ekstensi tflite ke resolver
config.resolver.assetExts.push("tflite");

// 2. Export SATU KALI saja, dengan membungkus config yang sudah diubah
module.exports = withNativeWind(config, { input: "./src/global.css" });
