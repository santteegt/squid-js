import ConfigProvider from "../ConfigProvider"
import Brizo from "./Brizo"

/**
 * Provides the Brizo instance.
 */
export default class BrizoProvider {

    /**
     * Set an Brizo instance.
     * @param {Brizo} brizo New Brizo instance.
     */
    public static setBrizo(brizo: Brizo) {
        BrizoProvider.brizo = brizo
    }

    /**
     * Returns Acuarius instance. It creates a new one if it's not defined.
     * @returns {Brizo} brizo instance.
     */
    public static getBrizo() {
        if (!BrizoProvider.brizo) {
            BrizoProvider.brizo = new Brizo(ConfigProvider.getConfig())
        }
        return BrizoProvider.brizo
    }

    /**
     * Brizo instance.
     * @type {Brizo}
     */
    private static brizo: Brizo = null
}
