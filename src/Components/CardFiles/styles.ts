import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import { FlatList } from "react-native";


interface IContainerProps {
  invisible: boolean;
}

export const Container = styled.TouchableOpacity<IContainerProps>`
  min-width: ${RFValue(100)}px;
  max-width: ${RFValue(100)}px;
   margin-left:${RFValue(4)}px; 

  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 5px;

  justify-content: space-between;

  padding: ${RFValue(5)}px ${RFValue(8)}px;

  ${({ invisible }) => (invisible ? "display:none" : "")};
`;
export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(12)};
`;
