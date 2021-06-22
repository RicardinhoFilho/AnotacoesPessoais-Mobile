import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

export const Container = styled.ScrollView`
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

export const Main = styled.View`
  width: 100%;

  background-color: ${({ theme }) => theme.colors.primary};
`;

export const MainWrapper = styled.View`
  margin-top: ${RFPercentage(-20)}px;
  padding: 0 ${RFValue(32)}px;

  justify-content: space-between; ;
`;
