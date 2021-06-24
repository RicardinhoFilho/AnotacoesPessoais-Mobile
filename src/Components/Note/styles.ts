import styled from "styled-components/native";

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

import { FlatList } from "react-native";

export const Container = styled.ScrollView`
  flex: 1%;
  background-color: ${({ theme }) => theme.colors.secondary};
`;
export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  height: ${RFValue(113)}px;

  flex-direction: row;

  align-items: center;

  padding: ${RFValue(20)}px;
`;

export const ReturnIcon = styled.TouchableOpacity`
  margin-bottom: ${RFValue(40)}px;
`;
export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)};
  margin-top: ${RFValue(20)};

  margin-left: ${RFPercentage(12)}px;
`;

export const FilesView = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary};
`;
export const FilesList = styled(FlatList as new () => FlatList<IFile>).attrs({
  showsHorizontalScrollIndicator: false,
  horizontal: true,
})``;

export const Loader = styled.ActivityIndicator.attrs({
  color: "#3f51b5",
  size: RFValue(50),
})`
  margin-bottom: ${RFValue(10)}px;
`;
