import styled from "styled-components/native";

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

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

export const ReturnIcon = styled.Text`
  margin-bottom: ${RFValue(40)}px;
`;
export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)};
  margin-top: ${RFValue(20)};

  margin-left: ${RFPercentage(12)}px;
`;

export const Form = styled.View`
  flex: 1%;
  justify-content: space-between;
  width: 100%;
  padding: ${RFValue(24)}px;
`;

export const InputForm = styled.TextInput`
  width: 100%;
  padding: 16px 18px;

  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};

  background-color: ${({ theme }) => theme.colors.light};
  border-radius: 5px;

  margin-bottom: 8px;
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 5px;

  height: ${RFValue(50)}px;

  align-items: center;
  justify-content: center;

  margin-top:${RFValue(10)}px;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.light};
`;

export const Attention = styled.Text`

  color: ${({ theme }) => theme.colors.attention};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size:${RFValue(15)}px;

  margin-top: -${RFValue(5)}px;

`; 

export const Loader = styled.ActivityIndicator.attrs({
  color: "#3f51b5",
  size: RFValue(50),
})`
  margin-bottom: ${RFValue(10)}px;
`;

export const Fields = styled.View``;
