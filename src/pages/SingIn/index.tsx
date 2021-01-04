import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/AuthContext';
import { useToast } from '../../hooks/toast';
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

    const { signIn } = useAuth();
    const { addToast } = useToast();

    const handleSubmit = useCallback(
        async (data: SingInFormData) => {
            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    email: Yup.string()
                    .required('Email obrigatório')
                    .email('Digite um email válido'),
                    password: Yup.string().required('Senha Obrigatoria'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                await signIn({
                    email: data.email,
                    password: data.password,
                });

            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);

                    formRef.current?.setErrors(errors);
                }

                addToast({
                    type: 'error',
                    title: 'Erro na autenticação',
                    description: 'Ocorreu erro ao fazer Login'
                });
            }
        }, 
        [signIn, addToast]);

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