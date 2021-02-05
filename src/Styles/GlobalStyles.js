import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export default createGlobalStyle`
    ${reset};
    /* @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700'); */
    // gmarket 폰트
    @font-face {
    font-family: 'GmarketSans';
    font-style: normal;
    font-weight: 400;
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansLight.woff') format('woff');
    }
    @font-face {
        font-family: 'GmarketSans';
        font-style: normal;
        font-weight: 600;
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    }
    @font-face {
        font-family: 'GmarketSans';
        font-style: normal;
        font-weight: 800;
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansBold.woff') format('woff');
    }
    * {
        box-sizing:border-box;
    }
    body {
        background-color:${(props) => props.theme.bgColor};
        color:${(props) => props.theme.blackColor};
        font-size:14px;
        font-family: 'GmarketSans';
        /* font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; */
        padding-top: ${window.location.hash !== '#/study' ? '68px' : '0px'};
    }
    input, textarea, button {
        font-family: 'GmarketSans';
    }
    a {
        color:${(props) => props.theme.blueColor};
        text-decoration:none;
    }
    input:focus{
        outline:none;
    }
    button {
        outline: none;
    }
    button:hover{
        filter: brightness(120%);
    }
    `;
