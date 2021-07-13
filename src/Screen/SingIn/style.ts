import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { Image } from "react-native";

import SinsoftLogo from "../../Assets/logo-sinsoft-removebg-preview.png";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary};
  width: 100%;

  height: ${RFPercentage(70)}px;

  justify-content: flex-end;
  align-items: center;
`;

export const SinsoftButton = styled.TouchableOpacity``;

export const Logo = styled(Image).attrs({ source: SinsoftLogo })``;

export const Title = styled.Text`
  font-size: ${RFValue(28)}px;
  font-family: ${({ theme }) => theme.fonts.medium};

  color: ${({ theme }) => theme.colors.title};

  margin-bottom: ${RFValue(30)}px;
`;

export const AnottationText = styled.Text`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};

  margin-bottom: ${RFValue(10)}px;
`;

export const SignInTitle = styled.Text`
  font-size: ${RFValue(18)}px;

  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};

  margin-bottom: ${RFValue(50)}px;
`;

export const Footer = styled.View`
  width: 100%;
  height: ${RFPercentage(40)};

  background-color: ${({ theme }) => theme.colors.primary};
`;

export const FooterWrapper = styled.View`
  margin-top: ${RFPercentage(-4)}px;
  padding: 0 ${RFValue(32)}px;

  justify-content: space-between; ;
`;

export const Loader = styled.ActivityIndicator.attrs({
  color: "#3f51b5",
  size: RFValue(50),
})`
`;