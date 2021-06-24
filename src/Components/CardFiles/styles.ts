import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import { FlatList } from "react-native";

interface IFile {
  file: string;
  id: string;
  title: string;
}

export const Container = styled.TouchableOpacity`
  min-width: ${RFValue(100)}px;
  max-width: ${RFValue(100)}px;
   margin-left:${RFValue(4)}px; 

  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 5px;

  justify-content: space-between;

  padding: ${RFValue(5)}px ${RFValue(8)}px;
`;
export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(12)};
`;
