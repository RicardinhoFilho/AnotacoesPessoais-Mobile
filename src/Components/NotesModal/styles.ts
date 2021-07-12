import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { FlatList } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { RectButton } from "react-native-gesture-handler";

interface INote {
  title: string;
  description?: string;
  id: string | number;
  annotation: string;
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.secondary};
`;
export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};

  height: ${RFPercentage(42)}px;
  width: 100%;

  padding: 0 24px;
  align-items: flex-start;

  justify-content: center;

  flex-direction: row;
`;
export const HeaderHandlerView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin-top: ${RFValue(35)}px;
  /* padding-bottom:${RFValue(10)}px; */
  /* margin-left: ${RFValue(50)}px;
  margin-right: ${RFValue(50)}px; */
`;

export const ReturnButton = styled.TouchableOpacity`
  margin-right: ${RFValue(5)}px;
`;

export const ReturnIcon = styled(AntDesign).attrs({
  size: RFValue(30),
  color: "white",
})``;

export const RepositoryTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(20)}px;

  color: ${({ theme }) => theme.colors.light};
`;

export const NotesCount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(15)}px;

  color: ${({ theme }) => theme.colors.light};
`;

export const RepositoryInformation = styled.View`
  

  /* min-width: ${RFValue(330)}px; */
  max-width: ${RFValue(300)}px;
`;

export const RepositoryDescription = styled.View`
margin-top:${RFValue(10)}px;
  margin-bottom: ${RFValue(1)}px;
  /* background-color: red; */
  align-items: center;
  width: 100%;
`;
export const RepositoryDescriptionText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const NotesList = styled(FlatList as new () => FlatList<INote>).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})`
  margin-top: ${RFValue(10)}px;
`;

export const Loader = styled.ActivityIndicator.attrs({
  color: "#363F5F",
  size: RFValue(90),
})`
  margin-top: 50%;
`;

export const NotesView = styled.View`
  flex: 1;
  padding: 0 24px;

  margin-top: -${RFValue(210)}px;

  align-items: center;
`;
export const NotesViewHeader = styled.View`
  padding: 0 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const ReturnIconButton = styled.TouchableOpacity`
  margin-right: ${RFValue(10)};
`;

export const HandleView = styled.View`
  padding: 0 20px;
`;
export const AddNoteButton = styled.TouchableOpacity`
  /* background-color: ${({ theme }) => theme.colors.secondary}; */
`;

export const AddNoteIcon = styled(MaterialCommunityIcons).attrs({
  size: RFValue(25),
  color: "#D3D3D3",
})`
  /* background-color: ${({ theme }) => theme.colors.secondary}; */
`;
export const FilterNoteIcon = styled(AntDesign).attrs({
  size: RFValue(25),
  color: "#D3D3D3",
})`
  /* background-color: ${({ theme }) => theme.colors.secondary}; */
`;

export const FilterNoteIconButton = styled(RectButton)``;

export const Filter = styled.TextInput`
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;

  width: 95%;
`;
