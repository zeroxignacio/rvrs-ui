import { createGlobalStyle } from 'styled-components'

const Style = createGlobalStyle`
* {
  font-family: 'Exo', sans-serif;
}

#root {
  background: radial-gradient(circle at 100%, 
    #2B3647, 
    #121212 0%,
    #060606 65%, 
    #141414 75%, 
    #3A3A3A 75.1%,
    #000000 75%
    );
    border-width: 2px;
    border-color: #3A3A3A;
    border-style: solid;
}

body {
  background-color: #121212;
}

div {
  color: #FFFFFF !important;
}

button {
  background-color: #FFFFFF;
}

button:hover {
  background-color: #FFFFFF;
}

a:hover{
  text-decoration: none !important;
  color: #D6D6D6;
}

.nav-links:hover{
  color: #D6D6D6;
}

/* width */
::-webkit-scrollbar {
  width: 4px;
  height: 3px; 
}

/* Track */
  ::-webkit-scrollbar-track {
  border-width: 3px;
  border-color: transparent;
  border-style: solid;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #CFCFCF;
  border-radius: 2px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  cursor: grab;
}

`
export default Style
