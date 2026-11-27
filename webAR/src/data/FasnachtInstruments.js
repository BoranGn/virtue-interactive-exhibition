export const fasnachtInstruments = [
    {
        id: "basel-drum",
        type: "SOURCE:MESH",
        path: "/models/basel-drum.glb",
        audio:{
            type: "SOURCE:AUDIO",
            path: "/audios/drum-solo.mp3"

        },
        translations: {
            de: {
                name: "Basler Trommel",
                description: "Die Basler Trommel ist ein traditionelles Schlaginstrument der Basler Fasnacht. Zusammen mit dem Piccolo prägt sie die Musik der Cliquen."
            },
            en: {
                name: "Basel Drum",
                description: "The Basel drum is a traditional percussion instrument of Basel Fasnacht. Together with the piccolo, it is central to the music performed by Cliques."
            }
        }
    },
    {
        id: "piccolo",
        type: "SOURCE:MESH",
        path: "/models/piccolo.glb",

        audio:{
            type: "SOURCE:AUDIO",
            path: "/audios/piccolo-solo.m4a",

        },
        translations: {
            de: {
                name: "Piccolo",
                description: "Das Piccolo ist ein kleines Blasinstrument mit einem hohen, durchdringenden Klang. Es wird an der Basler Fasnacht zusammen mit der Basler Trommel gespielt."
            },
            en: {
                name: "Piccolo",
                description: "The piccolo is a small wind instrument with a high-pitched, distinctive sound. During Basel Fasnacht, it is played together with the Basel drum."
            }
        }
    }
];
