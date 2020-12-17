import React, { useCallback, useRef, useContext } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { AuthContext } from '../../context/AuthContext';
import logoImg from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErros';

import { Container, Content, Background } from './styles';

interface SingInFormData {
    email: string;
    password: string;
}


const SingIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { signIn } = useContext(AuthContext);

    const handleSubmit = useCallback(
        async (data: SingInFormData) => {
            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    email: Yup.string().required('Email obrigatório').email('Digite um email válido'),
                    password: Yup.string().min(6, 'A senha deve ter mais de 6 digitos'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                signIn({
                    email: data.email,
                    password: data.password,
                });

            } catch (err) {
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);
            }
        }, [signIn]);

    return(
        <Container>
            <Content>
                <img src={logoImg} alt="GoBarber"/>

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu login</h1>

                    <Input name="email" icon={FiMail} placeholder="E-mail"/>
                    <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

                    <Button type="submit">Entrar</Button>

                    <a href="forgot">Esqqueci minha senha</a>
                </Form>

                <a href="Texte">
                    <FiLogIn />
                    Criar conta
                </a>
            </Content>
            <Background />
        </Container>
)};

export default SingIn;