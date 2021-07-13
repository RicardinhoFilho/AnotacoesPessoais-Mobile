import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

export const Container = styled.View`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
    
  width: 100%;
  height: 100%;
`;
export const Modal = styled.View`
  background-color: ${({ theme }) => theme.colors.text};
  align-items: center;

  padding: ${RFValue(17)}px ${RFValue(24)}px;

  width: 80%;

  margin-top: ${RFPercentage(30)};

  border-radius: 5px;
`;

export const ButtonConatiner = styled.View`
  width: 40%;

  flex-direction: row;
  justify-content: center;
`;

export const EditButton = styled.TouchableOpacity`
  margin-top: ${RFValue(15)}px;
`;
export const EditIcon = styled(Feather).attrs({ size: RFValue(40) })``;

export const TrashButton = styled.TouchableOpacity`
  margin-top: ${RFValue(15)}px;
`;
export const TrashIcon = styled(Feather).attrs({ size: RFValue(40) })``;

export const Title = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.medium};

  color: ${({ theme }) => theme.colors.title};
`;

export const NoteTitle = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.bold};

  color: ${({ theme }) => theme.colors.primary};
`;

export const Loader = styled.ActivityIndicator.attrs({
  color: "#3f51b5",
  size: RFValue(50),
})`
`;