import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import { FlatList } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";

interface IRepository {
  title: string;
  description?: string;
  id: number;
}

interface INote {
  id: string;
  title: string;
  description?: string;
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

export const LogoutButton = styled.TouchableOpacity`
  margin-top: ${RFValue(50)}px;
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(24)}px;
`;

export const SearchContainer = styled.View`
  align-items: center;
  margin-top: -${RFPercentage(20)}px;
`;

export const SearchTextInput = styled.TextInput`
  background-color: ${({ theme }) => theme.colors.text};

  color: ${({ theme }) => theme.colors.light};
  border-radius: 5px;

  padding: ${RFValue(10)}px;
`;

export const FilterTextInput = styled.TextInput`
  margin-top: ${RFValue(5)}px;

  background-color: ${({ theme }) => theme.colors.text};

  color: ${({ theme }) => theme.colors.light};
  border-radius: 5px;

  padding: ${RFValue(10)}px;
`;

export const SearchTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  margin-top: ${RFValue(10)}px;

  color: ${({ theme }) => theme.colors.title};
`;

export const RepositoriesList = styled(
  FlatList as new () => FlatList<IRepository>
).attrs({
  // horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})`
  margin-top: ${RFValue(10)}px;
`;

export const NotesList = styled(FlatList as new () => FlatList<INote>).attrs({
  // horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})`
  margin-top: ${RFValue(10)}px;
`;

export const ResultContainer = styled.View`
  padding: 0 24px;
  align-items: center;
  justify-content: space-between;
  flex:1;
`;
export const RepositoriesContainer = styled.View`
  justify-content: center;
`;
export const NotesContainer = styled.View`
  justify-content: center;
`;

export const Loader = styled.ActivityIndicator.attrs({
  color: "#363F5F",
  size: RFValue(80),
  marginTop: RFPercentage(20),
})``;
