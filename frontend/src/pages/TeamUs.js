import { styled } from "@mui/material/styles";
import { Grid, Box, Typography } from "@mui/material";

//img
import YT from "../image/오윤택.PNG";
import DJ from "../image/이동준.PNG";
import JA from "../image/이정아.PNG";
import SW from "../image/최소원.PNG";
import HS from "../image/한혜성.PNG";
import SH from "../image/황소현.PNG";

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

  const MemberWrapper = styled(Grid)(() => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }));

  const teamList = [
    {
      img: YT,
      name: "오윤택",
      description: "팀장, Block-chain",
    },
    {
      img: HS,
      name: "한혜성",
      description: "Block-chain 리더",
    },
    {
      img: JA,
      name: "이정아",
      description: "Back-end, Front-end",
    },
    {
      img: SH,
      name: "황소현",
      description: "Front-end 리더",
    },
    {
      img: DJ,
      name: "이동준",
      description: "Front-end, Jira",
    },
    {
      img: SW,
      name: "최소원",
      description: "Front-end, UCC",
    },
  ];

  return (
    <Wrapper>
      <MemberWrapper>
        <Typography variant="h3">Team Member</Typography>
        <Grid sx={{m:2}} container spacing={3}>
          {teamList.map((item, index) => (
            <Grid item display="flex" flexDirection="column" alignItems="center" xs={4}>
              <Box
                component="img"
                sx={{ height: "100px", width: "100px" }}
                src={item.img}
              ></Box>
              <Typography variant="h5">{item.name}</Typography>
              <Typography>{item.description}</Typography>
            </Grid>
          ))}
        </Grid>
      </MemberWrapper>
    </Wrapper>
  );
};

export default TeamUs;
