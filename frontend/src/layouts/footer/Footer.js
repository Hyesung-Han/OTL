import { styled } from "@mui/material/styles";
import { Grid, Link } from "@mui/material";

const Footer = () => {
  /**
   * HSH | 2022.03.16 | v1.0
   * @name Wrapper
   * @des Footer 구역 지정
   */

  const Wrapper = styled(Grid)(() => ({
    width: "100%",
    height: "100px",
    backgroundColor: "#111111",

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  }));

  /**
   * HSH | 2022.03.16 | v1.0
   * @name FooterStyle
   * @des Footer 크기, padding 설정
   */
  const FooterStyle = styled(Grid)(() => ({
    width: 1400,
    padding: "20px 0px",

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  }));

  /**
   * HSH | 2022.03.16 | v1.0
   * @name FooterStyle
   * @des 저작권 권리 표시 style
   */

  const CopyrightStyle = styled(Grid)(() => ({
    color: "#ffffff",
  }));

  /**
   * HSH | 2022.03.16 | v1.0
   * @name LinkStyle
   * @des Footer에 들어갈 링크
   */

  const LinkStyle = styled(Grid)(() => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  }));

  return (
    <Wrapper>
      <FooterStyle>
        <CopyrightStyle>
          Copyright @2022 OTL All rights reserved.
        </CopyrightStyle>
        <LinkStyle>
          <Link href="/Policy" underline="hover">
            Privacy Policy
          </Link>{" "}
          &nbsp;| &nbsp;
          <Link href="/AboutUs" underline="hover">
            Team of Us
          </Link>
        </LinkStyle>
      </FooterStyle>
    </Wrapper>
  );
};

export default Footer;
