import { Grid } from '@mui/material';
import Canvas from './Canvas';

/**
 * LJA | 2022.03.28 | ADD
 * @name MyRoom
 * @des MyRoom 컴포넌트
 */

const MyRoom = ({myItems}) => {

  if(!myItems) return <>로딩</>;
  return (
    <Grid>
      <h2>마이룸</h2>
      <Canvas items={myItems}></Canvas>
    </Grid>
  );
}

export default MyRoom;