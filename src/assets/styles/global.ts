import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
:root {
  font-size: 60%;
}

* {
  margin: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color:  rgba(255, 255, 255, 0); 
}

/* html,
body,
#root {
  height: 100%;
} */

body,
input,
button,
textarea {
  font: 500 1.6rem 'Nunito', sans-serif;
  font-weight: 600;
}

.container {
  width: 100%;
  max-width: 700px;
}

@media (max-width: 800px) {
  :root {
    font-size: 65%;
    transition: ease all 0.5s;
  }
} 
/* 
@media (min-width: 700px) {
  :root {
    font-size: 60%;
    transition: ease all 0.5s;
  }
} */

`
