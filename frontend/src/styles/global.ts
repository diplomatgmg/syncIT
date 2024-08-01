import { createGlobalStyle } from "styled-components"
import NunitoBlackTtf from "/fonts/Nunito-Black.ttf"
import NunitoBoldTtf from "/fonts/Nunito-Bold.ttf"
import NunitoRegularTtf from "/fonts/Nunito-Regular.ttf"
import { colors } from "@/styles/theme.ts"

export default createGlobalStyle`
    @font-face {
        font-family: "Nunito";
        src: url(${NunitoBlackTtf}) format("truetype");
        font-weight: 900;
        font-style: normal;
    }

    @font-face {
        font-family: "Nunito";
        src: url(${NunitoBoldTtf}) format("truetype");
        font-weight: 700;
        font-style: normal;
    }

    @font-face {
        font-family: "Nunito";
        src: url(${NunitoRegularTtf}) format("truetype");
        font-weight: 400;
        font-style: normal;
    }
    
    :root {
        line-height: 1;
        letter-spacing: 1px;
        font-family: "Nunito", sans-serif;
    }
    
    body {
        background: ${colors.primary};
    }
`
