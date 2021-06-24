import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

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

export const OpenFile = styled.TouchableOpacity`
  width: 80%;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 5px;

  margin: auto;

  height: ${RFValue(50)}px;

  align-items: center;
  justify-content: center;

  margin-top: ${RFPercentage(30)}px;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(20)};
`;
