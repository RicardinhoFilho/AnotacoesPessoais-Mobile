import React, { useState } from "react";
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { useRepositories } from "../../hooks/repositories";

import {
  Container,
  Header,
  ReturnIcon,
  Title,
  Form,
  Fields,
  InputForm,
  Attention,
  SubmitButton,
  ButtonText,
  HandleIconView,
  HandleTitleView,
  Loader,
} from "./styles";

interface IRepositoryOperations {
  repository?: IRepository;
  onClose(): void;
}

interface ICreate {}

interface IUpdate {
  repository: IRepository;
}

interface IRepository {
  id: string;
  title: string;
  description?: string;
}

export function RepositoryOperations({
  repository,
  onClose,
}: IRepositoryOperations) {
  const { addRepository, updateRepository } = useRepositories();

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(() => {
    if (repository) {
      return repository.title;
    }
    return "";
  });
  const [description, setDescription] = useState(() => {
    if (repository) {
      return repository.description;
    }

    return "";
  });

  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  function handleTitleError() {
    if (title.length < 3) {
      setTitleError("Título deve conter pelo menos 3 caractéres");
      return;
    }

    if (title.length > 50) {
      setTitleError("Título não pode conter mais de 50 caractéres");
      return;
    }

    setTitleError("");
  }

  function handleDescriptionError() {
    if (title.length < 3) {
      setDescriptionError(
        "Descrição deve conter pelo menos 3 caractéres ou ser vazia!"
      );
      return;
    }

    if (title.length > 150) {
      setDescriptionError("Descrição não pode conter mais de 150 caractéres");
      return;
    }

    setDescriptionError("");
  }

  async function handleRegister() {
    setLoading(true);
    handleDescriptionError();
    handleTitleError();
    onClose();

    if (!titleError && !descriptionError) {
      try {
        if (repository) {
          await updateRepository(repository.id, repository.title, title, description) 
        } else {
          await addRepository({ title, description });
        }
      } catch (error) {
        console.log(error);
        Alert.alert(error.message);
      }
    }

    setLoading(false);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <ReturnIcon
            onPress={() => {
              //console.log("cliqueii");
              onClose();
            }}
          >
            <AntDesign name="left" size={20} color="white" />
          </ReturnIcon>
          <HandleTitleView>
            <Title>
              {repository ? "Atualizar Repositório" : "Cadastrar Repositório"}
            </Title>
          </HandleTitleView>
        </Header>
        <Form>
          <Fields>
            <InputForm
              value={title}
              placeholder="Título"
              onChangeText={setTitle}
              onBlur={handleTitleError}
            />
            <Attention>{titleError}</Attention>

            <InputForm
              value={description}
              placeholder="Descrição"
              autoCorrect={false}
              onChangeText={setDescription}
              onBlur={handleDescriptionError}
            />
            <Attention>{descriptionError}</Attention>

            {loading && <Loader />}

            <SubmitButton onPress={handleRegister}>
              <ButtonText>Confirmar</ButtonText>
            </SubmitButton>
          </Fields>
        </Form>
      </Container>
    </TouchableWithoutFeedback>
  );
}
