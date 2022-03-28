import { createGlobalStyle } from 'styled-components'

const Style = createGlobalStyle`
* {
  font-family: 'Exo', sans-serif;
}

#root {
  background: radial-gradient(circle at 100%, #2B3647, #2B3647 50%, #39475C 75%, #2B3647 75%);
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

::-webkit-scrollbar-thumb {
  background: #323B4A;
  border-radius: 0px;
  height: 10px;
}

/* width */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-thumb:hover {
  background: #3C4557;
}

`
export default Style
