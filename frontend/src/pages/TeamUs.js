import { styled } from "@mui/material/styles";
import { Grid, Link } from "@mui/material";

/**
 * HSH | 2022.03.26 | v1.0
 * @name TeamUs
 * @des Team 소개
 */
const TeamUs = () => {
  const Wrapper = styled(Grid)(() => ({
    width: "100%",

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  }));

  const MemberWrapper=styled(Grid)(()=>({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  }));

  return (
  <Wrapper>
      <MemberWrapper>
        
      </MemberWrapper>
  </Wrapper>
  );
};

export default TeamUs;
