import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { FlatList } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";

import { AntDesign } from "@expo/vector-icons";
interface IRepository {
  id: string;
  title: string;
  description?: string;
  date: string;
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

  justify-content: space-between;

  flex-direction: row;
`;
export const UserInfo = styled.View`
  margin-top: ${RFValue(50)}px;

  flex-direction: row;
`;
export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;

  border-radius: 10px;
`;

export const User = styled.View`
  margin-left: 17px;
  /* Saltar para baixo */
`;

export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  font-family: ${({ theme }) => theme.fonts.regular};
`;
export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.light};

  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const LogoutButton = styled(BorderlessButton)`
  margin-top: ${RFValue(50)}px;
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(24)}px;
`;

export const RepositoriesView = styled.View`
  flex: 1;
  padding: 0 24px;
  margin-top: -${RFValue(150)}px;

  align-items: center;
`;

export const RepositoriesViewHeader = styled.View`
  padding: 0 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const AddFolderButton = styled(RectButton)`
  /* background-color: ${({ theme }) => theme.colors.secondary}; */
`;

export const AddFolderIcon = styled(AntDesign).attrs({
  size: RFValue(25),
  color: "#D3D3D3",
})`
  /* background-color: ${({ theme }) => theme.colors.secondary}; */
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${15}px;
`;

export const FilterFolderIconButton = styled(RectButton)``;

export const FilterFolderIcon = styled(AntDesign).attrs({
  size: RFValue(25),
  color: "#D3D3D3",
})`
  /* background-color: ${({ theme }) => theme.colors.secondary}; */
`;

export const ReturnIconButton = styled(RectButton)`
  margin-right: ${RFValue(10)};
`;

export const ReturnIcon = styled(AntDesign).attrs({
  size: RFValue(25),
  color: "#D3D3D3",
})`
  /* background-color: ${({ theme }) => theme.colors.secondary}; */
`;

export const Filter = styled.TextInput`
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;

  width: 95%;
`;

export const HandleView = styled.View`
  padding: 0 20px;
`;

export const RepositoriesList = styled(
  FlatList as new () => FlatList<IRepository>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})`
  margin-top: ${RFValue(10)}px;
`;
