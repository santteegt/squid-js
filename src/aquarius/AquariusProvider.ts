import ConfigProvider from "../ConfigProvider"
import Aquarius from "./Aquarius"

/**
 * Provides the Aquarius instance.
 */
export default class AquariusProvider {

    /**
     * Set an Aquarius instance.
     * @param {Aquarius} aquarius New Aquarius instance.
     */
    public static setAquarius(aquarius: Aquarius) {
        AquariusProvider.aquarius = aquarius
    }

    /**
     * Returns Acuarius instance. It creates a new one if it's not defined.
     * @returns {Aquarius} Aquarius instance.
     */
    public static getAquarius() {
        if (!AquariusProvider.aquarius) {
            AquariusProvider.aquarius = new Aquarius(ConfigProvider.getConfig())
        }
        return AquariusProvider.aquarius
    }

    /**
     * Aquarius instance.
     * @type {Aquarius}
     */
    private static aquarius: Aquarius = null
}
