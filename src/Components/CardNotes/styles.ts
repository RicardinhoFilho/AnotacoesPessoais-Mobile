import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

interface IContainerProps {
  invisible: boolean;
}

export const Container = styled.TouchableOpacity<IContainerProps>`
  min-width: ${RFValue(330)}px;
  max-width: ${RFValue(375)}px;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 5px;

  ${({ invisible }) => (invisible ? "display:none" : "")};

  justify-content: space-between;

  padding: ${RFValue(17)}px ${RFValue(24)}px;
  margin-bottom: ${RFValue(16)}px;
`;
export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(18)};
`;
export const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};

  font-size: ${RFValue(16)};

  margin-left: ${RFValue(20)}px;
`;