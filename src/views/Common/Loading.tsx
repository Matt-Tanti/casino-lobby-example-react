import styled from "styled-components";
import { Styles } from "../../types/modelTypes";

const styles: Styles = {
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

const Spinner = styled.span`
  width: 3rem;
  height: 3rem;
  margin: 3rem;
  border: 5px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loading = () => {
  return (
    <div style={styles.container}>
      <Spinner />
    </div>
  );
};

export default Loading;
