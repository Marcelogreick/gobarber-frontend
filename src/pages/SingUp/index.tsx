import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import logoImg from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErros';

import { 
    Container,
    Content,
    Background
} from './styles';

const SingUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(async (data: object) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('Email obrigatório').email('Digite um email válido'),
                password: Yup.string().min(6, 'A senha deve ter mais de 6 digitos'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

        } catch (err) {
            const errors = getValidationErrors(err);

            formRef.current?.setErrors(errors);
        }
    }, []);

    return(
        <Container>
        <Background />

        <Content>
            <img src={logoImg} alt="GoBarber"/>

            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Faça seu cadastro</h1>

                <Input name="name" icon={FiUser} placeholder="Nome"/>
                <Input name="email" icon={FiMail} placeholder="E-mail"/>
                <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

                <Button type="submit">Cadastrar</Button>
            </Form>

            <a href="Texte">
                <FiArrowLeft />
                Voltar para Login
            </a>
        </Content>
    </Container>
    );
}

export default SingUp;