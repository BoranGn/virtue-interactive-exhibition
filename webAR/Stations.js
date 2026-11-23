/**
 * Defines the configuration for the interactive exhibition stations.
 *
 * Responsibilities:
 * - Store station IDs, titles and associated media items.
 * - Define which content belongs to each station.
 * - Provide station configurations for navigation with QR codes.
 */

export const stations = {
    larven: {
        title: "Vieli Larve, vieli Gschichte",
        mediaIds: ["waggis", "alti-dante", "ueli", "blätzlibajass", "dummpeter","pierrot"]
    },

    musik: {
        title: "D'Kläng vo de Fasnacht",
        mediaIds: ["basler-trommel", "piccolo"]
    },

    archiv: {
        title: "Drey scheenste Dääg"
    }
};