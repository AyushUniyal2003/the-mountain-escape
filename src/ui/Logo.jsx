import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";
//"src/data/img/logo-dark.png"

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 13.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();

  const src = isDarkMode ? "logo-dark.png" : "logo-light.png";
  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
