import Config from "./models/Config"

/**
 * Stores the configuration of the library.
 */
export default class ConfigProvider {

    /**
     * @return {Config} Library config.
     */
    public static getConfig(): Config {
        return ConfigProvider.config
    }

    /**
     * @param {Config} Library config.
     */
    public static setConfig(config: Config) {
        ConfigProvider.config = config
    }

    /**
     * Library config.
     * @type {Config}
     */
    private static config: Config
}
