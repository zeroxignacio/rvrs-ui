import { createGlobalStyle } from 'styled-components'

const Style = createGlobalStyle`
* {
  font-family: 'Exo', sans-serif;
}

#root {
  background: radial-gradient(circle at 100%, 
    #2B3647, 
    #121212 0%,
    #121212 65%, 
    #141414 75%, 
    #313131 75.1%,
    #121212 75%
    );
    border-width: 2px;
    border-color: #313131;
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
  width: 5px;
}

/* Track */
  ::-webkit-scrollbar-track {
  background: frey;  
  width: 5px;
  border-radius: 0px;
  border-width: 1px;
  border-color: #121212;
  border-style: solid;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #CFCFCF;
  border-radius: 0px;

}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  opacity: 0.5;
}

`
export default Style
